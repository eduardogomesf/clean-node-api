import { AddSurveyParams } from '@/domain/use-cases/survey/add-survey'

export interface AddSurveyRepository {
  add (data: AddSurveyParams): Promise<void>
}
