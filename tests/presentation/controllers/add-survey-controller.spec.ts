
import MockDate from 'mockdate'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { AddSurvey } from '@/domain/use-cases'
import { AddSurveyController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { throwError } from '@/tests/domain/mocks'
import { AddSurveySpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: AddSurveyController
  validationSpy: Validation
  addSurverySpy: AddSurvey
}

const mockRequest = (): AddSurveyController.Request => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addSurverySpy = new AddSurveySpy()
  const sut = new AddSurveyController(validationSpy, addSurverySpy)

  return { sut, validationSpy, addSurverySpy }
}

describe('Add Survey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  it('Should call AddSurvey with correct values', async () => {
    const { sut, addSurverySpy } = makeSut()
    const addSpy = jest.spyOn(addSurverySpy, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({ ...request, date: new Date() })
  })

  it('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurverySpy } = makeSut()
    jest.spyOn(addSurverySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })
})
