import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: Controller
  logErrorRepositorySpy: LogErrorRepository
}

class ControllerSpy implements Controller {
  async handle (httpRequest: any): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      body: {
        name: 'any_value'
      },
      statusCode: 200
    }
    return Promise.resolve(httpResponse)
  }
}

const mockRequest = (): any => ({
  any_value: 'any_value'
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
