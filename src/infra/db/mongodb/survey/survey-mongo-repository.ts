import { ObjectId } from 'mongodb'
import { AddSurveyRepository } from '@/data/protocols/db/mongo/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/use-cases/survey/load-surveys/db-load-surveys-protocols'
import { LoadSurveyByIdRepository } from '@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { CheckSurveyByIdRepository } from '@/data/protocols/db/mongo/survey/check-survey-by-id-repository'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository {
  async add (surveyData: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find({}).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) }, { projection: { _id: 1 } })
    return !!survey
  }
}
