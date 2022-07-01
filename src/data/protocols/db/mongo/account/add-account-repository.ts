import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/use-cases/account/add-account'

export interface AddAccountRepository {
  add (account: AddAccountParams): Promise<AccountModel>
}
