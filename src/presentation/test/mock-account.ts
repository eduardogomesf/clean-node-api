import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/use-cases/account/add-account'
import { Authentication, AuthenticationParams } from '@/domain/use-cases/account/authentication'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'

export class AddAccountSpy implements AddAccount {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return Promise.resolve(mockAccountModel())
  }
}

export class AuthenticationSpy implements Authentication {
  async auth (credentials: AuthenticationParams): Promise<AuthenticationModel> {
    return Promise.resolve({ accessToken: 'any_token', name: 'any_name' })
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  load (accessToken: string, role?: string | undefined): Promise<AccountModel> {
    return Promise.resolve(mockAccountModel())
  }
}
