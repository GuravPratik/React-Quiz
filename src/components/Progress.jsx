import { useQuiz } from "../context/QuizContext";

/* eslint-disable react/prop-types */
function Progress() {
  const { state } = useQuiz();
  const { index, questions, points, answer } = state;
  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, current) => {
    return prev + current.points;
  }, 0);

  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
