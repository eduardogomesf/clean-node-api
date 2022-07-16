import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  loadAll (): Promise<LoadSurveysRepository.Result>
}

export namespace LoadSurveysRepository {
  export type Result = SurveyModel[]
}
