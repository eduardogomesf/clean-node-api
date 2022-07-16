import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}
