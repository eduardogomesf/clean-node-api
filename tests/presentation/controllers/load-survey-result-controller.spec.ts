import MockDate from 'mockdate'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyResult } from '@/domain/use-cases/survey-result/load-survey-result'
import { LoadSurveyById } from '@/domain/use-cases/survey/load-survey-by-id'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { throwError, mockSurveyResultModel } from '@/tests/domain/mocks'
import { LoadSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: 'any_survey_id'

})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdSpy: LoadSurveyById
  loadSurveyResultSpy: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(loadSurveyByIdSpy, loadSurveyResultSpy)

  return { sut, loadSurveyByIdSpy, loadSurveyResultSpy }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyById with correct value', async () => {
    const { loadSurveyByIdSpy, sut } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdSpy, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('Should return 403 if LoadSurveyById return null', async () => {
    const { loadSurveyByIdSpy, sut } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('Should return 500 if LoadSurveyById throws', async () => {
    const { loadSurveyByIdSpy, sut } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyResultSpy, 'load')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('Should return 500 if LoadSurveyResult throws', async () => {
    const { loadSurveyResultSpy, sut } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
