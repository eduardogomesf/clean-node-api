import { AddAccount } from '@/domain/use-cases/account/add-account'
import { Authentication } from '@/domain/use-cases/account/authentication'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'

export class AddAccountSpy implements AddAccount {
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    return Promise.resolve(true)
  }
}

export class AuthenticationSpy implements Authentication {
  async auth (credentials: Authentication.Params): Promise<Authentication.Result> {
    return Promise.resolve({ accessToken: 'any_token', name: 'any_name' })
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  load (accessToken: string, role?: string | undefined): Promise<LoadAccountByToken.Result> {
    return Promise.resolve({ id: 'any_account_id' })
  }
}
