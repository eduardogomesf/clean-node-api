import { HttpRequest, HttpResponse } from '../add-survey/add-survey-controller-protocols'
import { Controller, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
