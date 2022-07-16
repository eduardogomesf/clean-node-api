import { LoadSurveysRepository } from '@/data/protocols'
import { LoadSurveys } from '@/domain/use-cases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) { }

  async load (): Promise<LoadSurveys.Result> {
    return await this.loadSurveysRepository.loadAll()
  }
}
