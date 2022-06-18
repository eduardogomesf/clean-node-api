import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../use-cases/add-account/db-add-account.factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignupValidation()
  return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), validationComposite, makeDbAuthentication()))
}
