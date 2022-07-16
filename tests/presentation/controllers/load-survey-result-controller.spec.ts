import MockDate from 'mockdate'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyResult } from '@/domain/use-cases/survey-result/load-survey-result'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'
import { throwError, mockSurveyResultModel } from '@/tests/domain/mocks'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'
import { CheckSurveyById } from '@/domain/use-cases/survey/check-survey-by-id'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: 'any_survey_id'

})

type SutTypes = {
  sut: LoadSurveyResultController
  checkSurveyByIdSpy: CheckSurveyById
  loadSurveyResultSpy: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdSpy = new CheckSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultSpy)

  return { sut, checkSurveyByIdSpy, loadSurveyResultSpy }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call CheckSurveyById with correct value', async () => {
    const { checkSurveyByIdSpy, sut } = makeSut()
    const loadByIdSpy = jest.spyOn(checkSurveyByIdSpy, 'checkById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('Should return 403 if CheckSurveyById return null', async () => {
    const { checkSurveyByIdSpy, sut } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('Should return 500 if CheckSurveyById throws', async () => {
    const { checkSurveyByIdSpy, sut } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockImplementationOnce(throwError)
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
