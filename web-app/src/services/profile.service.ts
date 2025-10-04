import { apiClient } from '@/lib/api-client';

export interface StudentBasicInfo {
  dateNaissance: string;
  id: number;
  lieuNaissance: string;
  lieuNaissanceArabe: string;
  nomArabe: string;
  nomLatin: string;
  nss: string;
  prenomArabe: string;
  prenomLatin: string;
}

export interface StudentDetailedInfo {
  anneeAcademiqueCode: string;
  anneeAcademiqueId: number;
  id: number;
  individuNomArabe: string;
  individuNomLatin: string;
  individuPrenomArabe: string;
  individuPrenomLatin: string;
  niveauId: number;
  niveauLibelleLongAr: string;
  niveauLibelleLongLt: string;
  numeroInscription: string;
  ouvertureOffreFormationId: number;
  photo: string;
  refLibelleCycle: string;
  refLibelleCycleAr: string;
  situationId: number;
  transportPaye: boolean;
}

export interface AcademicYear {
  id: number;
  code: string;
}

export interface AcademicPeriod {
  code: string;
  id: number;
  libelleLongAr: string;
  libelleLongArCycle: string;
  libelleLongArNiveau: string;
  libelleLongFrCycle: string;
  libelleLongFrNiveau: string;
  libelleLongLt: string;
  rang: number;
}

export class ProfileService {
  async getStudentBasicInfo(): Promise<StudentBasicInfo> {
    const cacheKey = 'student_basic_info';
    const cached = apiClient.getCache<StudentBasicInfo>(cacheKey);
    
    if (cached) return cached;

    const uuid = apiClient.getUuid();
    if (!uuid) throw new Error('UUID not found');

    const data = await apiClient.get<StudentBasicInfo>(`/infos/bac/${uuid}/individu`);
    apiClient.saveCache(cacheKey, data);
    
    return data;
  }

  async getCurrentAcademicYear(): Promise<AcademicYear> {
    const cacheKey = 'current_academic_year';
    const cached = apiClient.getCache<AcademicYear>(cacheKey);
    
    if (cached) return cached;

    const data = await apiClient.get<AcademicYear>('/infos/AnneeAcademiqueEncours');
    apiClient.saveCache(cacheKey, data);
    
    return data;
  }

  async getStudentDetailedInfo(academicYearId: number): Promise<StudentDetailedInfo> {
    const cacheKey = `student_detailed_info_${academicYearId}`;
    const cached = apiClient.getCache<StudentDetailedInfo>(cacheKey);
    
    if (cached) return cached;

    const uuid = apiClient.getUuid();
    if (!uuid) throw new Error('UUID not found');

    const data = await apiClient.get<StudentDetailedInfo>(
      `/infos/bac/${uuid}/anneeAcademique/${academicYearId}/dia`
    );
    apiClient.saveCache(cacheKey, data);
    
    return data;
  }

  async getStudentProfileImage(): Promise<string> {
    const uuid = apiClient.getUuid();
    if (!uuid) throw new Error('UUID not found');

    return await apiClient.get<string>(`/infos/image/${uuid}`);
  }

  async getInstitutionLogo(etablissementId: number): Promise<string> {
    return await apiClient.get<string>(`/infos/logoEtablissement/${etablissementId}`);
  }

  async getAcademicPeriods(niveauId: number): Promise<AcademicPeriod[]> {
    const cacheKey = `academic_periods_${niveauId}`;
    const cached = apiClient.getCache<AcademicPeriod[]>(cacheKey);
    
    if (cached) return cached;

    const data = await apiClient.get<AcademicPeriod[]>(`/infos/niveau/${niveauId}/periodes`);
    apiClient.saveCache(cacheKey, data);
    
    return data;
  }
}

export const profileService = new ProfileService();

