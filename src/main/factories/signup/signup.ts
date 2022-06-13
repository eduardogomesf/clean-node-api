import { DbAddAccount } from '../../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validationComposite = makeSignupValidation()
  const signupController = new SignUpController(dbAddAccount, validationComposite)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
