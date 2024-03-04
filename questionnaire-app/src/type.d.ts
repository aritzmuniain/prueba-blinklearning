type AppState = {
    testMode: boolean
    questionnaire: Questionnaire | null
    loading: boolean
    answers: Answer[] | null
}

type Questionnaire = Question[]

type Question = {
    id: Number
    statement: String
    answer: boolean
} 

type Answer = {
  questionId: Number | null,
  answer: boolean | null
}

