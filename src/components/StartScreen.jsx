/* eslint-disable react/prop-types */

import { useQuiz } from "../context/QuizContext";

/* eslint-disable react/no-unescaped-entities */
function StartScreen() {
  const { dispatch, state } = useQuiz();
  const { questions } = state;
  const numOfQuestions = questions.length;
  function onStart() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome To The React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button className="btn" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
