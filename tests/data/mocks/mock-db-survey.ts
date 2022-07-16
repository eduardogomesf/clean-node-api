import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { CheckSurveyByIdRepository, AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  async add (data: AddSurveyRepository.Params): Promise<void> {
    return Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  async loadById (): Promise<LoadSurveyByIdRepository.Result> {
    return Promise.resolve(mockSurveyModel())
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  async checkById (): Promise<CheckSurveyByIdRepository.Result> {
    return Promise.resolve(true)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  async loadAll (): Promise<LoadSurveysRepository.Result> {
    return Promise.resolve(mockSurveyModels())
  }
}
