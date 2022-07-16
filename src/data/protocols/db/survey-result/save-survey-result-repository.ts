import { SaveSurveyResult } from '@/domain/use-cases'

export interface SaveSurveyResultRepository {
  save (data: SaveSurveyResultRepository.Params): Promise<void>
}

export namespace SaveSurveyResultRepository {
  export type Params = SaveSurveyResult.Params
}
