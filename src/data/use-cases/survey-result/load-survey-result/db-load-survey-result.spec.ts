import { LoadSurveyResultRepository } from '@/data/protocols/db/mongo/survey-result/load-survey-result-by-id.repository'
import { DbLoadSurveyResult } from '@/data/use-cases/survey-result/load-survey-result/db-load-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

describe('DbLoadSurveyResult UseCase', () => {
  it('Shoud call LoadSurveyResultRepository with correct value', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id', null)
  })
})
