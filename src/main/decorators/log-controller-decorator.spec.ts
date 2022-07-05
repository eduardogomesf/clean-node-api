import { LogControllerDecorator } from './log-controller-decorator'
import { LogErrorRepository } from '@/data/protocols/db/mongo/log/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LogErrorRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: Controller
  logErrorRepositorySpy: LogErrorRepository
}

class ControllerSpy implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      body: {
        name: 'any_value'
      },
      statusCode: 200
    }
    return Promise.resolve(httpResponse)
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const mockServerError = (): any => ({
  name: 'any_value'
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)

  return { sut, controllerSpy, logErrorRepositorySpy }
}

describe('LogControllerDecorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()

    const handleSpy = jest.spyOn(controllerSpy, 'handle')

    await sut.handle(mockRequest())

    expect(handleSpy).toHaveBeenCalledWith(mockRequest())
  })

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok(mockServerError()))
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositorySpy, 'logError')

    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(Promise.resolve(makeFakeServerError()))

    await sut.handle(mockRequest())

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
