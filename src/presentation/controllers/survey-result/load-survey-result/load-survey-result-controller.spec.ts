import { LoadSurveyResultController } from './load-survey-result-controller'
import { HttpRequest, LoadSurveyById } from './load-survey-result-controller-protocols'
import { mockLoadSurveyById } from '@/presentation/test'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

type SutTypes = {
  loadSurveyByIdStub: LoadSurveyById
  sut: LoadSurveyResultController
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)

  return { sut, loadSurveyByIdStub }
}

describe('LoadSurveyResult Controller', () => {
  it('Should call LoadSurveyById with correct value', async () => {
    const { loadSurveyByIdStub, sut } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('Should return 403 if LoadSurveyById return null', async () => {
    const { loadSurveyByIdStub, sut } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
