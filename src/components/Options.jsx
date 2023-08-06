/* eslint-disable react/prop-types */
function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, idx) => {
        return (
          <button
            className={`btn btn-option ${idx === answer ? "answer" : ""} ${
              hasAnswered
                ? idx === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: idx });
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
