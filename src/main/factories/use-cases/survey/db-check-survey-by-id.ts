import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { CheckSurveyById } from '@/domain/use-cases/survey/check-survey-by-id'
import { DbCheckSurveyById } from '@/data/use-cases/survey/db-check-survey-by-id'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
