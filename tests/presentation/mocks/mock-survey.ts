import { mockSurveyModels } from '@/tests/domain/mocks'
import { AddSurvey, LoadSurveys, CheckSurveyById, LoadAnsweysBySurvey } from '@/domain/use-cases'

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
