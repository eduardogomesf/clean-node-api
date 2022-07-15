import { AddAccount, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const accountByEmail = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (accountByEmail) {
      return false
    }
    const hashedPassword = await this.hasher.hash(accountData.password)

    const isValid = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return isValid
  }
}
