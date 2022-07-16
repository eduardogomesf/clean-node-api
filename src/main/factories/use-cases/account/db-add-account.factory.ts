import { AddAccount } from '@/domain/use-cases'
import { DbAddAccount } from '@/data/use-cases'
import { BcryptAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
