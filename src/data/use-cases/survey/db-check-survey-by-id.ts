import { CheckSurveyByIdRepository } from '@/data/protocols'
import { CheckSurveyById } from '@/domain/use-cases'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (
    private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository
  ) { }

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return await this.checkSurveyByIdRepository.checkById(id)
  }
}
