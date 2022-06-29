import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/use-cases/load-survey-by-id'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/mongo/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) { }

  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(id)
    return new Promise((resolve) => resolve(null))
  }
}
