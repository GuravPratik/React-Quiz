import { useEffect, useReducer } from "react";
import "./index.css";
import Header from "./components/Header";
import Container from "./components/Container";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

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

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, current) => {
    return prev + current.points;
  }, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  function onStart() {
    dispatch({ type: "start" });
  }

  return (
    <div className="app">
      <Header />
      <Container>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} onStart={onStart} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              maxPossibleQuestions={numOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
