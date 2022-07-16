import { LoadSurveyResultRepository } from '@/data/protocols/db/mongo/survey-result/load-survey-result-by-id.repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/mongo/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/tests/domain/mocks/mock-save-result'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultRepository.Params): Promise<void> {
    return Promise.resolve(null)
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    return Promise.resolve(mockSurveyResultModel())
  }
}
