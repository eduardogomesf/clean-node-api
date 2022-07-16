import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { LoadSurveyResult } from '@/domain/use-cases/survey-result/load-survey-result'
import { SaveSurveyResult } from '@/domain/use-cases/survey-result/save-survey-result'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    return Promise.resolve(mockSurveyResultModel())
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  async load (surveyId: string): Promise<SurveyResultModel> {
    return Promise.resolve(mockSurveyResultModel())
  }
}
