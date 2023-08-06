import Options from "./Options";

/* eslint-disable react/prop-types */
function Question({ question, dispatch, answer }) {
  // {
  //     "question": "An effect will always run on the initial render.",
  //     "options": [
  //       "True",
  //       "It depends on the dependency array",
  //       "False",
  //       "In depends on the code in the effect"
  //     ],
  //     "correctOption": 0,
  //     "points": 30
  //   }

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
