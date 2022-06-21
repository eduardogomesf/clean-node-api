import { AddSurveyModel } from '../../../../../domain/use-cases/add-survey'

export interface AddSurveyRepository {
  add (data: AddSurveyModel): Promise<void>
}
