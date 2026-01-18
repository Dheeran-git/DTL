# backend/app/models/schemas.py
from pydantic import BaseModel
from typing import List, Optional

class SimplifiedAssessmentRequest(BaseModel):
    academic_year: str
    attendance: str
    overwhelm_frequency: str
    study_hours: str
    performance_satisfaction: int
    advisor_interaction: str
    support_network_strength: int
    employment_status: str
    financial_stress: str
    career_alignment: int
    withdrawal_considered: bool

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
    risk_factors: List[RiskFactor]
    recommendations: List[Recommendation]
    model_confidence: float

class HealthResponse(BaseModel):
    status: str
    version: str
    model_loaded: bool
