import MockDate from 'mockdate'
import { mockSurveyModel, throwError } from '@/tests/domain/mocks'
import { LoadSurveyByIdRepositorySpy } from '@/tests/data/mocks'
import { DbLoadSurveyById } from '@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id'
import { LoadSurveyByIdRepository } from '@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id-protocols'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)

  return { sut, loadSurveyByIdRepositorySpy }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return a survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('any_id')
    expect(survey).toEqual(mockSurveyModel())
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    expect(promise).rejects.toThrowError(new Error())
  })
})
