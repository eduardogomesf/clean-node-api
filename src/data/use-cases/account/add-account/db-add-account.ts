import { AddAccount, Hasher, AddAccountRepository, CheckAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const accountExists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)

    if (accountExists) {
      return false
    }
    const hashedPassword = await this.hasher.hash(accountData.password)

    const isValid = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return isValid
  }
}
