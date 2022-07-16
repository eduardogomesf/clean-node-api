import { throwError } from '@/tests/domain/mocks'
import { DbCheckSurveyById } from '@/data/use-cases/survey/check-survey-by-id/db-load-survey-by-id'
import { CheckSurveyByIdRepository } from '@/data/protocols/db/mongo/survey/check-survey-by-id-repository'
import { CheckSurveyByIdRepositorySpy } from '../mocks/mock-db-survey'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)

  return { sut, checkSurveyByIdRepositorySpy }
}

describe('DbCheckSurveyById', () => {
  it('Should call CheckSurveyByIdRepositorySpy', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    const checkByIdSpy = jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById')
    await sut.checkById('any_id')
    expect(checkByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return true if CheckSurveyByIdRepositorySpy returns true', async () => {
    const { sut } = makeSut()
    const surveyExists = await sut.checkById('any_id')
    expect(surveyExists).toEqual(true)
  })

  it('Should return false if CheckSurveyByIdRepositorySpy returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockReturnValueOnce(Promise.resolve(false))
    const surveyExists = await sut.checkById('any_id')
    expect(surveyExists).toEqual(false)
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById('any_id')
    expect(promise).rejects.toThrowError(new Error())
  })
})
