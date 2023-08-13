import { useEffect } from "react";
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
import { useQuiz } from "./context/QuizContext";

function App() {
  const { state, dispatch } = useQuiz();
  const { status } = state;
  // questions
  //
  // const maxPossiblePoints = questions.reduce((prev, current) => {
  //   return prev + current.points;
  // }, 0);

  useEffect(
    function () {
      fetch("http://localhost:9000/questions")
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch((e) => {
          console.error(e);
          dispatch({ type: "dataFailed" });
        });
    },
    [dispatch]
  );

  return (
    <div className="app">
      <Header />
      <Container>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Timer />
            <NextButton />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Container>
    </div>
  );
}

export default App;
