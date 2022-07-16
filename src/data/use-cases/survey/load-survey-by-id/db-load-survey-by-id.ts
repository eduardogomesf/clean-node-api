import { LoadAnsweysBySurvey, LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'

export class DbLoadAnswersBySurvey implements LoadAnsweysBySurvey {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) { }

  async loadAnswers (id: string): Promise<LoadAnsweysBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey?.answers.map(a => a.answer) || []
  }
}
