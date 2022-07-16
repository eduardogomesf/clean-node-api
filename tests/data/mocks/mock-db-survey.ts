import { AddSurveyRepository } from '@/data/use-cases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { LoadSurveysRepository } from '@/data/use-cases/survey/load-surveys/db-load-surveys-protocols'
import { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'

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
