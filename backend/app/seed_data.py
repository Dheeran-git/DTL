# backend/app/seed_data.py
"""Seeds demo data into the database for a fresh deployment."""
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import Prediction, AssessmentInput, RiskFactor, Recommendation
import random


async def db_has_data(db: AsyncSession) -> bool:
    result = await db.execute(select(func.count()).select_from(Prediction))
    return (result.scalar() or 0) > 0


async def seed_demo_data(db: AsyncSession):
    """Insert demo predictions so the dashboard has data on first run."""
    if await db_has_data(db):
        return  # Already seeded

    now = datetime.utcnow()

    demo_entries = [
        # (risk_level, risk_score, dropout_prob, confidence, days_ago, student_name, risk_factors, recommendations)
        ("high", 78, 0.78, 0.85, 1, "Priya Sharma", [("Financial", "High financial stress", "high"), ("Academic", "Low attendance", "high")], [("counseling", "Counseling Session", "immediate")]),
        ("high", 72, 0.72, 0.82, 2, "Rahul Mehta", [("Academic", "Overwhelm - Always", "high"), ("Support", "Weak support network", "medium")], [("academic", "Academic Mentor", "immediate")]),
        ("high", 65, 0.65, 0.80, 3, "Sneha Patel", [("Personal", "Withdrawal considered", "high"), ("Financial", "Moderate financial stress", "medium")], [("counseling", "Emergency Counseling", "immediate")]),
        ("medium", 48, 0.48, 0.78, 2, "Vikram Nair", [("Academic", "Sometimes overwhelmed", "medium"), ("Support", "Low advisor interaction", "medium")], [("peer", "Peer Support Group", "soon")]),
        ("medium", 42, 0.42, 0.76, 4, "Aisha Khan", [("Academic", "Moderate attendance", "medium")], [("academic", "Study Skills Workshop", "soon")]),
        ("medium", 52, 0.52, 0.79, 1, "Arjun Reddy", [("Financial", "Moderate stress", "medium"), ("Academic", "Performance satisfaction low", "medium")], [("financial", "Financial Aid Application", "soon")]),
        ("medium", 45, 0.45, 0.77, 3, "Meera Iyer", [("Support", "Low extracurricular hours", "medium")], [("peer", "Join Campus Club", "soon")]),
        ("low", 22, 0.22, 0.88, 1, "Sanjay Kumar", [("Academic", "Good attendance", "low")], [("peer", "Stay Connected", "when-needed")]),
        ("low", 18, 0.18, 0.90, 2, "Kavita Das", [], [("peer", "Continue Current Path", "when-needed")]),
        ("low", 25, 0.25, 0.87, 3, "Rohan Singh", [("Academic", "Slight performance dip", "low")], [("academic", "Office Hours Visit", "when-needed")]),
        ("low", 12, 0.12, 0.92, 4, "Ananya Misra", [], [("peer", "Stay Engaged", "when-needed")]),
        ("low", 28, 0.28, 0.86, 5, "Deepak Joshi", [("Support", "Could increase study hours", "low")], [("academic", "Time Management", "when-needed")]),
        ("low", 15, 0.15, 0.91, 2, "Pooja Agarwal", [], [("peer", "Keep It Up", "when-needed")]),
        ("medium", 38, 0.38, 0.75, 6, "Nisha Venkat", [("Academic", "Occasional overwhelm", "medium")], [("peer", "Stress Management", "soon")]),
    ]

    for (risk_level, risk_score, dropout_prob, confidence, days_ago, name, factors, recs) in demo_entries:
        pred = Prediction(
            created_at=now - timedelta(days=days_ago, hours=random.randint(0, 12)),
            risk_level=risk_level,
            risk_score=risk_score,
            dropout_probability=dropout_prob,
            predicted_class="Dropout" if risk_level == "high" else "Non-Dropout",
            prediction_confidence=confidence,
            endpoint="simplified"
        )
        db.add(pred)
        await db.flush()

        # Assessment input
        db.add(AssessmentInput(
            prediction_id=pred.id,
            consent_given=True,
            consent_data_processing=True,
            consent_anonymous_analytics=True,
            academic_year=random.choice(["1st", "2nd", "3rd", "4th"]),
            attendance={"high": "rarely", "medium": "sometimes", "low": "always"}[risk_level],
            overwhelm_frequency={"high": "always", "medium": "sometimes", "low": "never"}[risk_level],
            study_hours=random.choice(["1-2", "3-4", "5-6"]),
            performance_satisfaction={"high": 3, "medium": 5, "low": 8}[risk_level],
            advisor_interaction=random.choice(["never", "rarely", "sometimes", "often"]),
            support_network_strength={"high": 2, "medium": 5, "low": 8}[risk_level],
            extracurricular_hours=random.choice([0, 1, 3, 5]),
            employment_status=random.choice(["none", "part-time"]),
            financial_stress={"high": "high", "medium": "moderate", "low": "none"}[risk_level],
            career_alignment={"high": 3, "medium": 6, "low": 8}[risk_level],
            services_used="[]",
            withdrawal_considered=(risk_level == "high"),
            withdrawal_reasons="[]"
        ))

        for (category, factor_text, impact) in factors:
            db.add(RiskFactor(
                prediction_id=pred.id,
                category=category,
                factor=factor_text,
                impact=impact,
                description=f"{factor_text} identified as a {impact} risk factor for {name}."
            ))

        for (rec_type, title, urgency) in recs:
            db.add(Recommendation(
                prediction_id=pred.id,
                rec_type=rec_type,
                title=title,
                description=f"Recommended action: {title} for {name}.",
                urgency=urgency,
                contact=None
            ))

    await db.commit()
    print("[OK] Demo data seeded successfully (14 assessments)")
