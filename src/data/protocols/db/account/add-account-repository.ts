import { AddAccount } from '@/domain/use-cases'

export interface AddAccountRepository {
  add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = boolean
}
