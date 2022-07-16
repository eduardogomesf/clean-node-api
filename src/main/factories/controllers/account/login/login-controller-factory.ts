import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication, makeLogControllerDecorator } from '@/main/factories'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeLoginValidation(), makeDbAuthentication()))
}
