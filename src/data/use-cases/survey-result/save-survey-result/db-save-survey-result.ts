import { SaveSurveyResultParams, SaveSurveyResult, SurveyResultModel, SaveSurveyResultRepository, LoadSurveyResultRepository } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const { accountId, surveyId } = data
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)
    return surveyResult
  }
}
