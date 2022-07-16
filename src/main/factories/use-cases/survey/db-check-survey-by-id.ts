import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { CheckSurveyById } from '@/domain/use-cases'
import { DbCheckSurveyById } from '@/data/use-cases'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
