import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveys } from '../../../domain/use-cases/load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) { }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return new Promise(resolve => resolve(null))
  }
}
