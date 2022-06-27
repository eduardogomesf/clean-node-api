import { makeSignupValidation } from './signup-validation-factory'
import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/use-cases/account/add-account/db-add-account.factory'
import { makeDbAuthentication } from '@/main/factories/use-cases/account/authentication/db-authentication-factory'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignupValidation()
  return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), validationComposite, makeDbAuthentication()))
}
