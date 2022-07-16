import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult } from '@/domain/use-cases'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0
  },
  {
    answer: 'other_answer',
    image: 'any_image',
    count: 0,
    percent: 0
  }
  ],
  date: new Date()
})

export const makeSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})
