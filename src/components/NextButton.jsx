import { useQuiz } from "../context/QuizContext";

/* eslint-disable react/prop-types */
function NextButton() {
  const { dispatch, state } = useQuiz();
  const { answer, questions, index } = state;
  const maxPossibleQuestions = questions.length;

  if (answer === null) return null;

  if (index < maxPossibleQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );
  }

  if (index === maxPossibleQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
