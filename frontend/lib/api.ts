// frontend/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface PredictionResponse {
  risk_level: 'low' | 'medium' | 'high';
  risk_score: number;
  dropout_probability: number;
  risk_factors: Array<{
    category: string;
    factor: string;
    impact: string;
    description: string;
  }>;
  recommendations: Array<{
    type: string;
    title: string;
    description: string;
    urgency: string;
    contact?: string;
  }>;
  prediction_confidence: number;
}

export async function predictDropoutRisk(formData: any): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/predict/simplified`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Consent
        consent_given: formData.consentGiven,
        consent_data_processing: formData.consentDataProcessing,
        consent_anonymous_analytics: formData.consentAnonymousAnalytics,
        
        // Academic
        academic_year: formData.academicYear,
        attendance: formData.attendance,
        overwhelm_frequency: formData.overwhelmFrequency,
        study_hours: formData.studyHours,
        performance_satisfaction: formData.performanceSatisfaction,
        
        // Support
        advisor_interaction: formData.advisorInteraction,
        support_network_strength: formData.supportNetworkStrength,
        extracurricular_hours: formData.extracurricularHours,
        
        // Personal
        employment_status: formData.employmentStatus,
        financial_stress: formData.financialStress,
        career_alignment: formData.careerAlignment,
        
        // Services
        services_used: formData.servicesUsed,
        withdrawal_considered: formData.withdrawalConsidered,
        withdrawal_reasons: formData.withdrawalReasons,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Return fallback prediction
    return fallbackPrediction(formData);
  }
}

function fallbackPrediction(formData: any): PredictionResponse {
  // Client-side fallback if API is unavailable
  let riskScore = 0;

  // Attendance
  const attendanceScores: Record<string, number> = {
    'always': 0, 'often': 5, 'sometimes': 15, 'rarely': 25, 'never': 35
  };
  riskScore += attendanceScores[formData.attendance] || 0;

  // Overwhelm
  const overwhelmScores: Record<string, number> = {
    'never': 0, 'rarely': 5, 'sometimes': 10, 'often': 20, 'always': 30
  };
  riskScore += overwhelmScores[formData.overwhelmFrequency] || 0;

  // Financial stress
  const financialScores: Record<string, number> = {
    'none': 0, 'low': 5, 'moderate': 10, 'high': 20, 'very-high': 25
  };
  riskScore += financialScores[formData.financialStress] || 0;

  // Withdrawal consideration
  if (formData.withdrawalConsidered) riskScore += 15;

  // Performance satisfaction (inverse)
  riskScore += Math.max(0, 10 - formData.performanceSatisfaction) * 2;

  riskScore = Math.min(100, Math.max(0, riskScore));

  const riskLevel = riskScore >= 60 ? 'high' : riskScore >= 35 ? 'medium' : 'low';

  return {
    risk_level: riskLevel,
    risk_score: riskScore,
    dropout_probability: riskScore / 100,
    risk_factors: [],
    recommendations: [
      {
        type: 'peer',
        title: 'Stay Connected',
        description: 'Continue engaging with campus resources',
        urgency: 'when-needed'
      }
    ],
    prediction_confidence: 0.7
  };
}

export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    const data = await response.json();
    return data.status === 'healthy';
  } catch {
    return false;
  }
}
