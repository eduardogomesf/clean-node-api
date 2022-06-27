import { Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [
          { image: 'any_image', answer: 'any_answer' },
          { answer: 'other_answer' }
        ],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should get a list of surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            { image: 'any_image', answer: 'any_answer' },
            { answer: 'other_answer' }
          ],
          date: new Date()
        },
        {
          question: 'other_question',
          answers: [
            { image: 'other_image', answer: 'other_answer' },
            { answer: 'other_answer' }
          ],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect(surveys).toHaveLength(2)
    })

    test('Should get a empty list of surveys', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect(surveys).toHaveLength(0)
    })
  })
})
