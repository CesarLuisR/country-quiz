import React, { useState } from "react";
import "./styles/App.scss";
import Card from "./components/layout/Card/Card";
import useRandomQuestion from "./components/hook/useRandomQuestion";

const App: React.FC = (): JSX.Element => {
  const initialAnswersState: object = {
    correct: 0,
    misguided: 0,
    total: 0,
  };

  const [answers, setAnswers] = useState<object | any>(initialAnswersState);
  const [next, setNext] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | string>("default");

  let data = useRandomQuestion(answers);

  if (data) console.log(data);

  const handleDataChecker = (e: any) => {
    if (!data) return;

    if (typeof isCorrect === "boolean") return;
    let answer = e?.target?.children[1];

    if (answer?.textContent === data.correct) {
      answer.parentElement.style.background = "#60BF88";
      answer.parentElement.style.color = "#ffffff";
      answer.parentElement.style.border = "0.125rem solid #60BF88";
      setIsCorrect(true);
      setNext(true);
    } else if (answer?.textContent) {
      answer.parentElement.style.background = "#EA8282";
      answer.parentElement.style.color = "#ffffff";
      answer.parentElement.style.border = "0.125rem solid #EA8282";
      setIsCorrect(false);
      setNext(true);
    }
  };

  const handleNext = () => {
    setNext(false);
    setIsCorrect("default");

    if (typeof isCorrect === "string") return;

    if (isCorrect) {
      setAnswers({
        ...answers,
        correct: answers.correct + 1,
        total: answers.total + 1,
      });
    } else {
      setAnswers({
        ...answers,
        misguided: answers.misguided + 1,
        total: answers.total + 1,
      });
    }
  };

  return (
    <div className="app-container">
      {answers.total <= 9
        ? data && (
            <Card
              handleNext={handleNext}
              click={handleDataChecker}
              isCorrect={isCorrect}
              {...data}
              next={next}
              counter={answers.total}
            />
          )
        : data && <div>Termino xd</div>}
      <footer className="footer">
        Created by Cesar Luis Rijo - devChalleges.io
      </footer>
    </div>
  );
};

export default App;
