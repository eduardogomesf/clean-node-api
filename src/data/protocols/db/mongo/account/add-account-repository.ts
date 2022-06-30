import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/use-cases/account/add-account'

export interface AddAccountRepository {
  add (account: AddAccountModel): Promise<AccountModel>
}
