import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/use-cases'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    return Promise.resolve(mockSurveyResultModel())
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  async load (surveyId: string): Promise<LoadSurveyResult.Result> {
    return Promise.resolve(mockSurveyResultModel())
  }
}
