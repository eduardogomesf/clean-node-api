import { AddAccountRepository } from '../../../../data/protocols/db/mongo/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/use-cases/authentication/db-authentication-protocols'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/use-cases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    const { insertedId: id } = result

    const accountById = await accountCollection.findOne({ _id: id })

    return MongoHelper.map(accountById)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return account && MongoHelper.map(account)
  }
}
