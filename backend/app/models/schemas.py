# backend/app/models/schemas.py
from pydantic import BaseModel
from typing import List, Optional

class SimplifiedAssessmentRequest(BaseModel):
    # Consent
    consent_given: bool
    consent_data_processing: bool
    consent_anonymous_analytics: bool
    
    # Academic
    academic_year: str
    attendance: str
    overwhelm_frequency: str
    study_hours: str
    performance_satisfaction: int
    
    # Support
    advisor_interaction: str
    support_network_strength: int
    extracurricular_hours: int
    
    # Personal
    employment_status: str
    financial_stress: str
    career_alignment: int
    
    # Services
    services_used: list = []
    withdrawal_considered: bool
    withdrawal_reasons: list = []


class RawFeaturesRequest(BaseModel):
        """Accept raw feature dictionary matching trained FEATURE_COLUMNS order.

        Example:
            {
                "features": {"Curricular units 2nd sem (approved)": 3, "Curricular units 1st sem (approved)": 4, ...}
            }
        """
        features: dict

class RiskFactor(BaseModel):
    category: str
    factor: str
    impact: str
    description: str

class Recommendation(BaseModel):
    type: str
    title: str
    description: str
    urgency: str
    contact: Optional[str] = None

class PredictionResponse(BaseModel):
    risk_level: str
    risk_score: int
    dropout_probability: float
    predicted_class: Optional[str] = None
    risk_factors: List[RiskFactor]
    recommendations: List[Recommendation]
    prediction_confidence: float

class HealthResponse(BaseModel):
    status: str
    version: str
    ml_model_loaded: bool
