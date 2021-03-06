import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredFieldValidation', () => {
  it('Should return a MissingParamError if validations fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'field' })
    expect(error).toBeFalsy()
  })
})
