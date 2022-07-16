import { AddSurveyRepository } from '@/data/protocols'
import { AddSurvey } from '@/domain/use-cases'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) { }

  async add (data: AddSurvey.Params): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
