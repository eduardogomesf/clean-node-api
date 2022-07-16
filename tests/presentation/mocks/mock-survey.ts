import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { AddSurvey } from '@/domain/use-cases/survey/add-survey'
import { LoadSurveyById } from '@/domain/use-cases/survey/load-survey-by-id'
import { LoadSurveys } from '@/domain/use-cases/survey/load-surveys'

export class AddSurveySpy implements AddSurvey {
  async add (data: AddSurvey.Params): Promise<void> {
    return Promise.resolve()
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  async loadById (id: string): Promise<LoadSurveyById.Result> {
    return Promise.resolve(mockSurveyModel())
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  async load (): Promise<SurveyModel[]> {
    return Promise.resolve(mockSurveyModels())
  }
}
