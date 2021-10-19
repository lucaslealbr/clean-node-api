import { Collection } from 'mongodb'
import request from 'supertest'
import { AddSurveyModel } from '../../data/usecases/add-survey/db-add-survey-protocols'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image'
  }]
})

let surveyCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    const mognoUrl = process.env.MONGO_URL as string
    await MongoHelper.connect(mognoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurveyData())
        .expect(403)
    })
  })
})
