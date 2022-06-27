import { makeSignupValidation } from './signup-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { CompareFieldsValidation, RequiredFieldValidation, ValidationComposite, EmailValidation } from '@/validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validations.push(new EmailValidation('email', makeEmailValidatorStub()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
