export interface LoadAnsweysBySurvey {
  loadAnswers (id: string): Promise<LoadAnsweysBySurvey.Result>
}

export namespace LoadAnsweysBySurvey {
  export type Result = string[]
}
