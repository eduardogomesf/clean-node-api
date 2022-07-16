import MockDate from 'mockdate'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok } from '@/presentation/helpers/http-helper'
import { SaveSurveyResult } from '@/domain/use-cases/survey-result/save-survey-result'
import { LoadAnsweysBySurvey } from '@/domain/use-cases/survey/load-answers-by-survey'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import { throwError, mockSurveyResultModel } from '@/tests/domain/mocks'
import { LoadAnswersBySurveySpy, SaveSurveyResultSpy } from '@/tests/presentation/mocks'

const mockRequest = (): SaveSurveyResultController.Request => ({
  surveyId: 'any_id',
  answer: 'any_answer',
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnsweysBySurvey: LoadAnsweysBySurvey
  saveSurveyResultSpy: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadAnsweysBySurvey = new LoadAnswersBySurveySpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadAnsweysBySurvey, saveSurveyResultSpy)

  return { loadAnsweysBySurvey, sut, saveSurveyResultSpy }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadAnswersBySurveySpy with correct values', async () => {
    const { sut, loadAnsweysBySurvey } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAnsweysBySurvey, 'loadAnswers')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return 403 if LoadAnswersBySurveySpy returns null', async () => {
    const { sut, loadAnsweysBySurvey } = makeSut()
    jest.spyOn(loadAnsweysBySurvey, 'loadAnswers').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(403)
  })

  it('Should return 500 if LoadAnswersBySurveySpy throws', async () => {
    const { sut, loadAnsweysBySurvey } = makeSut()
    jest.spyOn(loadAnsweysBySurvey, 'loadAnswers').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(500)
  })

  it('Should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      surveyId: 'any_id',
      answer: 'wrong_answer',
      accountId: 'any_account_id'
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  it('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultSpy, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    })
  })

  it('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(500)
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
