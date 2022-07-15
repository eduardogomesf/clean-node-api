import { mockAccountModel } from '@/tests/domain/mocks'
import { AccountModel } from '@/domain/models/account'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/use-cases/account/add-account/db-add-account-protocols'
import { LoadAccountByTokenRepository } from '@/data/use-cases/account/load-account-by-token/db-load-account-by-token-protocols'
import { UpdateAccessTokenRepository } from '@/data/use-cases/account/authentication/db-authentication-protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    return Promise.resolve(mockAccountModel())
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    return Promise.resolve(mockAccountModel())
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    return Promise.resolve(mockAccountModel())
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    return Promise.resolve(null)
  }
}
