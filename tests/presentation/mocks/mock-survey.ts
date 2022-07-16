import { mockSurveyModels } from '@/tests/domain/mocks'
import { AddSurvey } from '@/domain/use-cases/survey/add-survey'
import { LoadSurveys } from '@/domain/use-cases/survey/load-surveys'
import { CheckSurveyById } from '@/domain/use-cases/survey/check-survey-by-id'
import { LoadAnsweysBySurvey } from '@/domain/use-cases/survey/load-answers-by-survey'

export class AddSurveySpy implements AddSurvey {
  async add (data: AddSurvey.Params): Promise<void> {
    return Promise.resolve()
  }
}

export class LoadAnswersBySurveySpy implements LoadAnsweysBySurvey {
  async loadAnswers (id: string): Promise<LoadAnsweysBySurvey.Result> {
    return Promise.resolve(['any_answer', 'any_other_answer'])
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return Promise.resolve(true)
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  async load (): Promise<LoadSurveys.Result> {
    return Promise.resolve(mockSurveyModels())
  }
}
