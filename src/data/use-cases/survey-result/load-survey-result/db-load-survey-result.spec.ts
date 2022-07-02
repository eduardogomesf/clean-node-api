import { mockLoadSurveyResultRepository } from '@/data/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/mongo/survey-result/load-survey-result-by-id.repository'
import { DbLoadSurveyResult } from '@/data/use-cases/survey-result/load-survey-result/db-load-survey-result'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

  return { loadSurveyResultRepositoryStub, sut }
}

describe('DbLoadSurveyResult UseCase', () => {
  it('Shoud call LoadSurveyResultRepository with correct value', async () => {
    const { loadSurveyResultRepositoryStub, sut } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id', null)
  })
})
