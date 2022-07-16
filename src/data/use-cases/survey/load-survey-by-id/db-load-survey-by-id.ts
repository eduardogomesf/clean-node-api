import { LoadSurveyById, LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) { }

  async loadById (id: string): Promise<LoadSurveyById.Result> {
    return await this.loadSurveyByIdRepository.loadById(id)
  }
}
