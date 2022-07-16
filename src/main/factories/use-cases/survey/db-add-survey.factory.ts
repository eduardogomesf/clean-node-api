import { AddSurvey } from '@/domain/use-cases'
import { DbAddSurvey } from '@/data/use-cases'
import { SurveyMongoRepository } from '@/infra/db'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
