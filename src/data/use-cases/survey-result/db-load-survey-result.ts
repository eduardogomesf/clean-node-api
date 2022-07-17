import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from '@/data/protocols'
import { LoadSurveyResult } from '@/domain/use-cases'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {

  }

  async load (surveyId: string): Promise<LoadSurveyResult.Result> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, null)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, { count: 0, percent: 0 }))
      }
    }
    console.log(surveyResult)
    return surveyResult
  }
}
