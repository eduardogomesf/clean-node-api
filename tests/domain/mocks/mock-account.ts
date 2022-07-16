import { AccountModel } from '@/domain/models'
import { AddAccount, Authentication } from '@/domain/use-cases'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_value'
})

export const makeAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAuthentication = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
