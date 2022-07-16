import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { makeDbSaveSurveyResult, makeDbLoadAnswersBySurvey } from '@/main/factories/use-cases'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResultController)
}
