import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/use-cases/account/add-account'

export interface AddAccountRepository {
  add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params

  export type Result = AccountModel
}
