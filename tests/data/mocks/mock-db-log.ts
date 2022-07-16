import { LogErrorRepository } from '@/data/protocols'

export class LogErrorRepositorySpy implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    return Promise.resolve()
  }
}
