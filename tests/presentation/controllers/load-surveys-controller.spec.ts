import MockDate from 'mockdate'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { mockSurveyModels, throwError } from '@/tests/domain/mocks'
import { LoadSurveysSpy } from '@/tests/presentation/mocks'
import { LoadSurveys } from '@/domain/use-cases'
import { LoadSurveysController } from '@/presentation/controllers'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)

  return { sut, loadSurveysSpy }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysSpy, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  it('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  it('Should throw if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
