// frontend/types/index.ts

export interface StudentAssessment {
  // Consent
  consentGiven: boolean;
  consentDataProcessing: boolean;
  consentAnonymousAnalytics: boolean;

  // Academic
  academicYear: '1st' | '2nd' | '3rd' | '4th';
  attendance: 'always' | 'often' | 'sometimes' | 'rarely' | 'never';
  overwhelmFrequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'always';
  studyHours: '1-3' | '3-5' | '5-8' | '8+';
  performanceSatisfaction: number;

  // Support
  advisorInteraction: 'never' | 'once-semester' | '2-3-semester' | 'monthly';
  supportNetworkStrength: number;
  extracurricularHours: number;

  // Personal
  employmentStatus: 'not-employed' | 'part-time' | 'full-time';
  financialStress: 'none' | 'low' | 'moderate' | 'high' | 'very-high';
  careerAlignment: number;

  // Services
  servicesUsed: string[];
  withdrawalConsidered: boolean;
  withdrawalReasons?: string[];
}

export interface RiskPrediction {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  dropoutProbability: number;
  riskFactors: RiskFactor[];
  recommendations: Recommendation[];
  modelConfidence: number;
}

export interface RiskFactor {
  category: string;
  factor: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
}

export interface Recommendation {
  type: 'counseling' | 'financial' | 'academic' | 'health' | 'peer';
  title: string;
  description: string;
  urgency: 'immediate' | 'soon' | 'when-needed';
  contact?: string;
}

export interface DashboardStats {
  totalAssessments: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  interventionSuccess: number;
  averageRiskScore: number;
}
