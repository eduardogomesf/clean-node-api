import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository'
import { LoadSurveyResult } from '@/domain/use-cases/survey-result/load-survey-result'
import { DbLoadSurveyResult } from '@/data/use-cases/survey-result/db-load-survey-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
