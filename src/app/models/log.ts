// src/app/models/log.model.ts
export interface AiAnalysis {
  summary_ar: string;
  summary_fr: string;
  recommended_action: string;
}

export interface SuspiciousLog {
  id: number;
  hostname: string;
  status: string;
  message: string;
  anomaly_score: number;
  ai_analysis: AiAnalysis | null;
  created_at: string;
}

export interface LogApiResponse {
  status: string;
  count: number;
  data: SuspiciousLog[];
}