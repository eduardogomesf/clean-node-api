import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { makeDbLoadSurveyResult, makeDbCheckSurveyById } from '@/main/factories/use-cases'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResultController)
}
