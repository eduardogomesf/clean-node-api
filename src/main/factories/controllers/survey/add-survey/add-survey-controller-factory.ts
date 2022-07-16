import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { AddSurveyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddSurvey } from '@/main/factories/use-cases'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}
