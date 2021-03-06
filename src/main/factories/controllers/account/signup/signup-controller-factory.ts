import { makeSignupValidation } from './signup-validation-factory'
import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers'
import { makeLogControllerDecorator, makeDbAddAccount, makeDbAuthentication } from '@/main/factories'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignupValidation()
  return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), validationComposite, makeDbAuthentication()))
}
