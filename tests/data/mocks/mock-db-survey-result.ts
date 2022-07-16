import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols'
import { mockSurveyResultModel } from '@/tests/domain/mocks/mock-save-result'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultRepository.Params): Promise<void> {
    return Promise.resolve(null)
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  async loadBySurveyId (surveyId: string, accountId: string): Promise<LoadSurveyResultRepository.Result> {
    return Promise.resolve(mockSurveyResultModel())
  }
}
