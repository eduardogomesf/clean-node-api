import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/use-cases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeLoginValidation(), makeDbAuthentication()))
}
