declare type Exam = {
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
} & DatabaseProperties;

declare type CheckResponse = {
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: {
    QID: string;
    Question: string;
    inCorrectAnswer: string;
    correctAnswer: string;
    // answers: {};
  }[];
  correctQuestions: {
    QID: string;
    Question: string;
    inCorrectAnswer: string;
    correctAnswer: string;
    // answers: {};
  }[];
};
