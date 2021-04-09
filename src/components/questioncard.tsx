import React from "react";
import { AnswerObject } from "../App";

type QuestionType = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<QuestionType> = (props) => {
  const {
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions,
  } = props;

  return (
    <div>
      <p className="number">
        Question: {`${questionNumber}/${totalQuestions}`}
      </p>
      <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers">
        {answers.map((answer, i) => (
          <div key={i}>
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
