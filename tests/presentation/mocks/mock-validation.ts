import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  validate (input: any): Error {
    return null as any
  }
}
