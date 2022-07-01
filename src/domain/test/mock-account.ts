import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/use-cases/account/add-account'
import { AuthenticationParams } from '@/domain/use-cases/account/authentication'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_value'
})

export const makeAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})