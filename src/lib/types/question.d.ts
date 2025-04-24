declare type Question = {
  answers: {
    answer: string;
    key: string;
  }[];
  type: "single_choice" | "multiple_choice";
  question: string;
  correct: string;
  subject: {
    name: string;
    icon: string;
  } & DatabaseProperties;
  exam: Exam;
} & DatabaseProperties;
