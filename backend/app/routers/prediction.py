# backend/app/routers/prediction.py
from fastapi import APIRouter, HTTPException
from app.models.schemas import SimplifiedAssessmentRequest, PredictionResponse, RiskFactor, Recommendation
from app.models.ml_model import ml_model

router = APIRouter(prefix="/predict", tags=["prediction"])

def calculate_fallback_risk(data: SimplifiedAssessmentRequest) -> PredictionResponse:
    """Fallback prediction when ML model is not available"""
    risk_score = 0

    # Attendance scoring
    attendance_scores = {
        'always': 0, 'often': 5, 'sometimes': 15, 'rarely': 25, 'never': 35
    }
    risk_score += attendance_scores.get(data.attendance, 0)

    # Overwhelm scoring
    overwhelm_scores = {
        'never': 0, 'rarely': 5, 'sometimes': 10, 'often': 20, 'always': 30
    }
    risk_score += overwhelm_scores.get(data.overwhelm_frequency, 0)

    # Financial stress scoring
    financial_scores = {
        'none': 0, 'low': 5, 'moderate': 10, 'high': 20, 'very-high': 25
    }
    risk_score += financial_scores.get(data.financial_stress, 0)

    # Withdrawal consideration
    if data.withdrawal_considered:
        risk_score += 15

    # Performance satisfaction (inverse)
    risk_score += max(0, 10 - data.performance_satisfaction) * 2

    # Advisor interaction (inverse - less interaction = higher risk)
    advisor_scores = {
        'never': 10, 'once-semester': 5, '2-3-semester': 2, 'monthly': 0
    }
    risk_score += advisor_scores.get(data.advisor_interaction, 0)

    # Normalize to 0-100
    risk_score = min(100, max(0, risk_score))

    # Determine risk level
    if risk_score >= 60:
        risk_level = 'high'
    elif risk_score >= 35:
        risk_level = 'medium'
    else:
        risk_level = 'low'

    # Generate risk factors
    risk_factors = []
    if data.attendance in ['rarely', 'never']:
        risk_factors.append(RiskFactor(
            category="Academic",
            factor="Low Class Attendance",
            impact="high",
            description="Inconsistent class attendance is strongly correlated with dropout risk"
        ))

    if data.overwhelm_frequency in ['often', 'always']:
        risk_factors.append(RiskFactor(
            category="Mental Health",
            factor="Academic Overwhelm",
            impact="high",
            description="Feeling frequently overwhelmed can lead to burnout and withdrawal"
        ))

    if data.financial_stress in ['high', 'very-high']:
        risk_factors.append(RiskFactor(
            category="Financial",
            factor="Financial Stress",
            impact="high",
            description="Financial difficulties are a leading cause of student withdrawal"
        ))

    if data.withdrawal_considered:
        risk_factors.append(RiskFactor(
            category="Behavioral",
            factor="Withdrawal Consideration",
            impact="high",
            description="Active consideration of withdrawal indicates elevated risk"
        ))

    # Generate recommendations
    recommendations = []
    if risk_level == 'high':
        recommendations.append(Recommendation(
            type="counseling",
            title="Mental Health Support",
            description="Schedule an urgent appointment with a counselor to discuss your concerns and develop a support plan",
            urgency="immediate",
            contact="counseling@rvce.edu.in"
        ))

    if data.financial_stress in ['high', 'very-high']:
        recommendations.append(Recommendation(
            type="financial",
            title="Financial Aid Office",
            description="Connect with financial aid office to explore scholarships, grants, and emergency funding options",
            urgency="soon",
            contact="financialaid@rvce.edu.in"
        ))

    if data.performance_satisfaction <= 4:
        recommendations.append(Recommendation(
            type="academic",
            title="Academic Tutoring",
            description="Access tutoring services and study groups to improve academic performance",
            urgency="soon",
            contact="tutoring@rvce.edu.in"
        ))

    if not recommendations:
        recommendations.append(Recommendation(
            type="peer",
            title="Stay Connected",
            description="Continue engaging with campus resources and maintain your support network",
            urgency="when-needed"
        ))

    return PredictionResponse(
        risk_level=risk_level,
        risk_score=risk_score,
        dropout_probability=risk_score / 100,
        risk_factors=risk_factors,
        recommendations=recommendations,
        model_confidence=0.75
    )

@router.post("/simplified", response_model=PredictionResponse)
async def predict_simplified(data: SimplifiedAssessmentRequest):
    """
    Predict dropout risk based on simplified assessment
    """
    try:
        # Use fallback prediction (ML model integration can be added later)
        result = calculate_fallback_risk(data)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
