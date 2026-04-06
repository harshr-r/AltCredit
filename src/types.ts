export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface CreditScore {
  score: number;
  maxScore: number;
  tier: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
}

export interface AnalysisFactor {
  id: string;
  name: string;
  consistency: number;
  description: string;
  icon: string;
  status: 'excellent' | 'good' | 'moderate' | 'poor';
}

export interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}
