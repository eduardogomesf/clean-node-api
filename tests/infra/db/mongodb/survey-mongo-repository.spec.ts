import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
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
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
      expect(surveys).toHaveLength(2)
    })

    test('Should get a empty list of surveys', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect(surveys).toHaveLength(0)
    })
  })

  describe('loadById()', () => {
    test('Should load a survey by id on success', async () => {
      const result = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          { image: 'any_image', answer: 'any_answer' },
          { answer: 'other_answer' }
        ],
        date: new Date()
      })
      const { insertedId: id } = result
      const sut = makeSut()
      const survey = await sut.loadById(String(id))
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should return true if survey exists', async () => {
      const result = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          { image: 'any_image', answer: 'any_answer' },
          { answer: 'other_answer' }
        ],
        date: new Date()
      })
      const { insertedId: id } = result
      const sut = makeSut()
      const surveyExists = await sut.checkById(String(id))
      expect(surveyExists).toBe(true)
    })

    test('Should return false if survey does not exist', async () => {
      const sut = makeSut()
      const objectID = new ObjectId()
      const exists = await sut.checkById(String(objectID))
      expect(exists).toBe(false)
    })
  })
})
