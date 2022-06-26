import { ok } from '../../../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../add-survey/add-survey-controller-protocols'
import { Controller, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
