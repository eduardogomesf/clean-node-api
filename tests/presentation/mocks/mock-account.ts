import { LoadAccountByToken, AddAccount, Authentication } from '@/domain/use-cases'

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
