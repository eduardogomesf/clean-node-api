import { Validation } from '@/presentation/protocols'
import { CompareFieldsValidation, RequiredFieldValidation, ValidationComposite, EmailValidation } from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
