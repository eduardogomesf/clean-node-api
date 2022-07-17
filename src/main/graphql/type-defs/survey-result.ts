import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    surveyResult (surveyId: String!): SurveyResult!
  }

   type SurveyResultAnswer {
    image: String
    answer: String!
    count: Int!
    percent: Int!
  }

  type SurveyResult  {
    surveyId: String!
    question: String!
    answers: [SurveyResultAnswer!]!
    date: String
  }

`
