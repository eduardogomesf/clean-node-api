import { EmailValidation } from './email-validation'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { EmailValidatorSpy } from '@/validation/test'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return { sut, emailValidatorSpy }
}

describe('Email Validation', () => {
  it('Should returns an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorSpy } = makeSut()

    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)

    const error = sut.validate({ email: 'any_mail@mail.com' })

    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('Should call EmailValidator.isValid with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')

    sut.validate({ email: 'any_mail@mail.com' })

    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  it('Should throw if EmailValidator.isValid throws', () => {
    const { sut, emailValidatorSpy } = makeSut()

    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementation(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
