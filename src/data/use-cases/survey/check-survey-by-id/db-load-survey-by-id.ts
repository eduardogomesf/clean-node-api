import { CheckSurveyByIdRepository } from '@/data/protocols/db/mongo/survey/check-survey-by-id-repository'
import { CheckSurveyById } from '@/domain/use-cases/survey/check-survey-by-id'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (
    private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository
  ) { }

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return await this.checkSurveyByIdRepository.checkById(id)
  }
}
