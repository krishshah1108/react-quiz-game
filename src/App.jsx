import React, { useState } from "react";
import data from "./assets/data.js";
import "./App.css";

const App = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [quizSubmited, setQuizSubmited] = useState(false);
  const [score, setScore] = useState(0);

  const curQuestion = data[questionIndex];

  const handleAnswerSelection = (selectedAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  console.log(selectedAnswers);

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNext = () => {
    if (questionIndex < data.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
    if (questionIndex === data.length - 1) {
      setQuizSubmited(true);
      selectedAnswers.forEach((answer) => {
        if (answer.correct) {
          setScore(score + 1);
        }
      });
    }
  };

  const getCurrectAnswer = (item) => {
    const isSelected = selectedAnswers[questionIndex]?.text === answer.text;
    if (quizSubmited && isSelected && item.correct) {
      return "correct";
    } else if (quizSubmited && isSelected && !item.correct) {
      return "incorrect";
    } else if (!quizSubmited && !isSelected) {
      return "selected";
    } else {
      return "";
    }
  };
  return (
    <div className='main-container'>
      <div className='quiz-container'>
        <h1>Quiz Application</h1>
        <div className='question-container'>
          <h2>{curQuestion.question}</h2>
          <div className='answer-container'>
            {curQuestion.answers.map((answer) => {
              const isSelected =
                selectedAnswers[questionIndex]?.text === answer.text;
              return (
                <div key={answer.text} className='answer'>
                  <button
                    className={`${
                      quizSubmited && answer.correct
                        ? "correct"
                        : quizSubmited && isSelected && !answer.correct
                        ? "incorrect"
                        : !quizSubmited && isSelected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelection(answer)}
                    disabled={quizSubmited}
                  >
                    {answer.text}
                  </button>
                </div>
              );
            })}
          </div>
          <div className='buttons'>
            {questionIndex > 0 && (
              <button onClick={handlePrevious}>Previous</button>
            )}
            {questionIndex <= data.length - 1 && (
              <button onClick={handleNext}>
                {questionIndex === data.length - 1 ? "Submit" : "Next"}
              </button>
            )}
          </div>
          {quizSubmited ? (
            <div>
              <h2>Quiz Completed</h2>
              <p>
                Your score: {score} out of {data.length}
              </p>
            </div>
          ) : null}
          <p>
            Question {questionIndex + 1} of {data.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
1;
