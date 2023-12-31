import { useQuiz } from "../context/QuizContext";

/* eslint-disable react/prop-types */
function FinishScreen() {
  const { state, dispatch } = useQuiz();
  const { points, questions, highScore } = state;
  const maxPossiblePoints = questions.reduce((prev, current) => {
    return prev + current.points;
  }, 0);
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Score <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(High Score: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
