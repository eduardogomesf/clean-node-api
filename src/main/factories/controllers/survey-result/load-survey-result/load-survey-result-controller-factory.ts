import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'
import { makeDbLoadSurveyResult } from '@/main/factories/use-cases/survey-result/load-survey-result/db-load-survey-result-factory'
import { makeDbCheckSurveyById } from '@/main/factories/use-cases/survey/check-survey-by-id/db-check-survey-by-id'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResultController)
}
