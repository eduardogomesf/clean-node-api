import { LoadSurveysController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadSurveys } from '@/main/factories/use-cases'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(loadSurveysController)
}
