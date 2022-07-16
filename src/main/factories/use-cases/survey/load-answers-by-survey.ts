import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadAnsweysBySurvey } from '@/domain/use-cases'
import { DbLoadAnswersBySurvey } from '@/data/use-cases'

export const makeDbLoadAnswersBySurvey = (): LoadAnsweysBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
