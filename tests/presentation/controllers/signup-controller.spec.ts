import { AddAccount, Authentication } from '@/domain/use-cases'
import { SignUpController } from '@/presentation/controllers'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { throwError } from '@/tests/domain/mocks'
import { AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccount
  validationSpy: Validation
  authenticationSpy: Authentication
}

const mockRequest = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, authenticationSpy)

  return { sut, addAccountSpy, validationSpy, authenticationSpy }
}

describe('SignUpController', () => {
  it('Should call AddAccount.add with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()

    const addSpy = jest.spyOn(addAccountSpy, 'add')

    await sut.handle(mockRequest())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  it('Should return 500 if AddAccount.add throws', async () => {
    const { sut, addAccountSpy } = makeSut()

    jest.spyOn(addAccountSpy, 'add').mockImplementation(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return 200 if correct data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  it('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
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

  it('Should call Authentication.auth with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const authSpy = jest.spyOn(authenticationSpy, 'auth')

    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
