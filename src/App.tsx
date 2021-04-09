import React, { useState, useEffect } from "react";
import "./styles.scss";
import { fetchQQuestions, Difficulty, QuestionState } from "./utils/api";

// components
import QuestionCard from "./components/questioncard";

// constant
const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);

  useEffect(() => {
    console.log(questions);
  });

  // const getQuestions = async () => {
  //   await fetchQQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
  // };

  const startQuiz = async () => {
    setLoading(true);
    setGameover(false);
    const newQuestions = await fetchQQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameover(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>Quizty</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startQuiz}>Start</button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p className="loading">loading questions</p> : null}
      {!loading && !gameOver ? (
        <QuestionCard
          callback={checkAnswer}
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          answers={questions[number].answers}
          question={questions[number].question}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
        />
      ) : null}
      {!loading &&
      !gameOver &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button onClick={nextQuestion}>Next</button>
      ) : null}
    </div>
  );
};

export default App;
