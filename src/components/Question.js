import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // ⏳ useEffect countdown logic
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          onAnswered(false); // call parent when time runs out
          return 10; // reset for next question
        } else {
          return prevTime - 1; // decrease by 1 each second
        }
      });
    }, 1000);

    // 🧹 Cleanup to prevent multiple timers or memory leaks
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);

  // Handles when user selects an answer
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
