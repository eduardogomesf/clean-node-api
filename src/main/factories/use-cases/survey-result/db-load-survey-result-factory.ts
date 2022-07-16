import { SurveyResultMongoRepository, SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadSurveyResult } from '@/domain/use-cases'
import { DbLoadSurveyResult } from '@/data/use-cases'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
