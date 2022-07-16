import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { SurveyModel } from '@/domain/models'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/'

let surveyResultCollection: Collection
let accountCollection: Collection
let surveyCollection: Collection

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      { image: 'any_image', answer: 'any_answer' },
      { answer: 'other_answer' },
      { answer: 'any_other_answer' }
    ],
    date: new Date()
  })
  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey) as any
}

const makeAccount = async (): Promise<{ id: string }> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password'
  })

  return { id: String(res.insertedId) }
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if it is new', async () => {
      const survey = await makeSurvey()
      const sut = makeSut()
      const { id: accountId } = await makeAccount()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({ surveyId: new ObjectId(survey.id), accountId: new ObjectId(accountId) })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update a survey result if it is not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const { id: accountId } = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection.find({ surveyId: new ObjectId(survey.id), accountId: new ObjectId(accountId) }).toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await makeSurvey()
      const sut = makeSut()
      const { id: accountId } = await makeAccount()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[1].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(2)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[2].count).toBe(0)
      expect(surveyResult.answers[2].percent).toBe(0)
    })
  })
})
