import { LoadSurveyResultRepository } from '@/data/protocols/db/mongo/survey-result/load-survey-result-by-id.repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/mongo/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test/mock-save-result'
import { SaveSurveyResultParams } from '@/domain/use-cases/survey-result/save-survey-result'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<void> {
    return Promise.resolve(null)
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    return Promise.resolve(mockSurveyResultModel())
  }
}
