import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeDbLoadSurveyResult, makeDbCheckSurveyById } from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResultController)
}
