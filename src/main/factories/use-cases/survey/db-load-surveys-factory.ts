import { LoadSurveys } from '@/domain/use-cases'
import { DbLoadSurveys } from '@/data/use-cases'
import { SurveyMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
