import { EmailValidation } from './email-validation'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols/email-validator'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidatorStub)

  return { sut, emailValidatorStub }
}

describe('Email Validation', () => {
  it('Should returns an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const error = sut.validate({ email: 'any_mail@mail.com' })

    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('Should call EmailValidator.isValid with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'any_mail@mail.com' })

    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  it('Should throw if EmailValidator.isValid throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
