import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    return Promise.resolve(true)
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    return Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      password: 'hashed_value'
    })
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    return Promise.resolve(false)
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
