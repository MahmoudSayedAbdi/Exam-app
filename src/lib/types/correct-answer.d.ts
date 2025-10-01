export interface correctAnswer {
    message: string
    correct: number
    wrong: number
    total: string
    WrongQuestions: WrongQuestion[]
    correctQuestions: unknown[]
  }

  export interface WrongQuestion {
    QID: string
    Question: string
    inCorrectAnswer: string
    correctAnswer: string
    answers: Answers
  }

  export type Answers = object
