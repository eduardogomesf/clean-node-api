import { Authentication } from '@/domain/use-cases'
import { LoginController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { throwError } from '@/tests/domain/mocks'
import { AuthenticationSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: LoginController
  validationSpy: Validation
  authenticationSpy: Authentication
}

const mockRequest = (): LoginController.Request => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)
  return { sut, validationSpy, authenticationSpy }
}

describe('Login Controller', () => {
  it('Should call Authentication.auth with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const authSpy = jest.spyOn(authenticationSpy, 'auth')

    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()

    const validateSpy = jest.spyOn(validationSpy, 'validate')

    const request = mockRequest()

    await sut.handle(mockRequest())

    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
