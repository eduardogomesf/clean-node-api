import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export class LogErrorRepositorySpy implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    return Promise.resolve()
  }
}
