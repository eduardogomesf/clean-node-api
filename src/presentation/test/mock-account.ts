import { AccountModel } from '@/domain/models/account'
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
  async auth (credentials: AuthenticationParams): Promise<string> {
    return Promise.resolve('any_token')
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  load (accessToken: string, role?: string | undefined): Promise<AccountModel> {
    return Promise.resolve(mockAccountModel())
  }
}
