import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController } from '@/main/factories'

export default {
  Query: {
    surveyResult: async (parent: any, args: any) => adaptResolver(makeLoadSurveyResultController(), args)
  }
}
