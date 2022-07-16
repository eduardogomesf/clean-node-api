import MockDate from 'mockdate'
import { makeAddSurveyParams, throwError } from '@/tests/domain/mocks'
import { AddSurveyRepositorySpy } from '@/tests/data/mocks'
import { DbAddSurvey } from '@/data/use-cases'
import { AddSurveyRepository } from '@/data/protocols'

type SutTypes = {
  addSurveyRepositorySpy: AddSurveyRepository
  sut: DbAddSurvey
}

export const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)

  return { sut, addSurveyRepositorySpy }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositorySpy, 'add')
    const surveyData = makeAddSurveyParams()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  it('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(makeAddSurveyParams())
    expect(promise).rejects.toThrowError(new Error())
  })
})
