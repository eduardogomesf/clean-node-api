import { ObjectId } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/use-cases/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/mongo/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/use-cases/load-surveys/db-load-surveys-protocols'
import { LoadSurveyByIdRepository } from '@/data/use-cases/load-survey-by-id/db-load-survey-by-id-protocols'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find({}).toArray()
    return surveys as any
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
