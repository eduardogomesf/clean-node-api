import { AddSurvey } from '@/domain/use-cases'
import { DbAddSurvey } from '@/data/use-cases'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
