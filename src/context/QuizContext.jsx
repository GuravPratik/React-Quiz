/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();
const SECOND_PER_QUESTIONS = 30;
const initalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};
function reducer(prevState, action) {
  const currentQuestion = prevState.questions.at(prevState.index);

  switch (action.type) {
    case "dataReceived":
      return { ...prevState, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...prevState, status: "error" };

    case "start":
      return {
        ...prevState,
        status: "active",
        secondRemaining: prevState.questions.length * SECOND_PER_QUESTIONS,
      };

    case "newAnswer":
      return {
        ...prevState,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? prevState.points + currentQuestion.points
            : prevState.points,
      };
    case "nextQuestion":
      return { ...prevState, index: prevState.index + 1, answer: null };

    case "finish":
      return {
        ...prevState,
        status: "finished",
        highScore:
          prevState.points > prevState.highScore
            ? prevState.points
            : prevState.highScore,
      };

    case "restart":
      return {
        ...prevState,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        secondRemaining: prevState.questions.length * SECOND_PER_QUESTIONS,
      };

    case "tick":
      return {
        ...prevState,
        secondRemaining: prevState.secondRemaining - 1,
        status: prevState.secondRemaining === 0 ? "finished" : prevState.status,
        highScore:
          prevState.points > prevState.highScore
            ? prevState.points
            : prevState.highScore,
      };
    default:
      throw new Error("Unknown action");
  }
}

function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Context use outside scope");
  return context;
}

export { QuizContextProvider, useQuiz };
