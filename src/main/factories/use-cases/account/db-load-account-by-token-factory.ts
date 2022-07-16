import { LoadAccountByToken } from '@/domain/use-cases'
import { DbLoadAccountByToken } from '@/data/use-cases'
import { JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
