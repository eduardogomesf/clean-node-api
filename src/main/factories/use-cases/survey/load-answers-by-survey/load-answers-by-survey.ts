import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { LoadAnsweysBySurvey } from '@/domain/use-cases/survey/load-answers-by-survey'
import { DbLoadAnswersBySurvey } from '@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id'

export const makeDbLoadAnswersBySurvey = (): LoadAnsweysBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
