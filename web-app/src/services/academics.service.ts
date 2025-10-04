import { apiClient } from '@/lib/api-client';

export interface ExamResult {
  autorisationDemandeRecours: boolean;
  dateDebutDepotRecours?: string;
  dateLimiteDepotRecours?: string;
  id: number;
  idPeriode: number;
  idDia: number;
  mcLibelleAr: string;
  mcLibelleFr: string;
  noteExamen?: number;
  planningSessionId: number;
  planningSessionIntitule: string;
  rattachementMcCoefficient: number;
  rattachementMcId: number;
  recoursAccorde?: boolean;
  recoursDemande?: boolean;
}

export interface ContinuousAssessment {
  absent: boolean;
  apCode: string;
  autorisationDemandeRecours: boolean;
  id: number;
  idDia: number;
  llPeriode: string;
  llPeriodeAr: string;
  note?: number;
  observation?: string;
  rattachementMcMcLibelleAr: string;
  rattachementMcMcLibelleFr: string;
  recoursAccorde?: boolean;
  recoursDemande?: boolean;
}

export class AcademicsService {
  async getExamResults(cardId: number): Promise<ExamResult[]> {
    const cacheKey = `exam_results_${cardId}`;
    const cached = apiClient.getCache<ExamResult[]>(cacheKey, 2 * 60 * 60 * 1000); // 2 hours
    
    if (cached) return cached;

    const data = await apiClient.get<ExamResult[]>(
      `/infos/planningSession/dia/${cardId}/noteExamens`
    );
    apiClient.saveCache(cacheKey, data);
    
    return data;
  }

  async getContinuousAssessments(cardId: number): Promise<ContinuousAssessment[]> {
    const cacheKey = `continuous_assessments_${cardId}`;
    const cached = apiClient.getCache<ContinuousAssessment[]>(cacheKey, 2 * 60 * 60 * 1000);
    
    if (cached) return cached;

    const data = await apiClient.get<ContinuousAssessment[]>(
      `/infos/controleContinue/dia/${cardId}/notesCC`
    );
    apiClient.saveCache(cacheKey, data);
    
    return data;
  }
}

export const academicsService = new AcademicsService();

