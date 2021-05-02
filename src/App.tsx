import React, { useState } from "react";
import "./styles/App.scss";
import Card from "./components/layout/Card/Card";
import WinCard from "./components/layout/WinCard/WinCard";
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

  let data: object | any = useRandomQuestion(answers);

  const handleDataChecker = (e: any): void => {
    if (typeof isCorrect === "boolean") return;

    let answer: any = e.target.children[1] || e.target;

    if (answer.textContent === data.correct) {
      const element = answer.parentElement.style;
      element.background = "#60BF88";
      element.color = "#ffffff";
      element.border = "0.125rem solid #60BF88";
      setIsCorrect(true);
      setNext(true);
    } else if (answer.textContent) {
      const element = answer.parentElement.style;
      element.background = "#EA8282";
      element.color = "#ffffff";
      element.border = "0.125rem solid #EA8282";
      setIsCorrect(false);
      setNext(true);

      for (let children of answer.parentElement.parentElement.children) {
        const checkElement = children.children[1].textContent;
        if (checkElement === data.correct) {
          const element = children.children[1].parentElement.style;
          element.background = "#60BF88";
          element.color = "#ffffff";
          element.border = "0.125rem solid #60BF88";
        }
      }
    }
  };

  const handleNext = (): void => {
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

  const handleReset = (): void => {
    setAnswers(initialAnswersState);
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
        : data && <WinCard data={answers} reset={handleReset} />}
      <footer className="footer">
        Created by Cesar Luis Rijo - devChalleges.io
      </footer>
    </div>
  );
};

export default App;
