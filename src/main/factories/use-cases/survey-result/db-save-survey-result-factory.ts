import { SaveSurveyResult } from '@/domain/use-cases'
import { DbSaveSurveyResult } from '@/data/use-cases'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
