import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccount } from '@/domain/use-cases/account/add-account'
import { Authentication, AuthenticationParams } from '@/domain/use-cases/account/authentication'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'

export class AddAccountSpy implements AddAccount {
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    return Promise.resolve(true)
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
