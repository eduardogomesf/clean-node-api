import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/use-cases/survey/add-survey'
import { AddSurveyRepository } from '@/data/use-cases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveysRepository } from '@/data/use-cases/survey/load-surveys/db-load-surveys-protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  async add (data: AddSurveyParams): Promise<void> {
    return Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  async loadById (): Promise<SurveyModel> {
    return Promise.resolve(mockSurveyModel())
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    return Promise.resolve(mockSurveyModels())
  }
}
