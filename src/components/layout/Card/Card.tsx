import React from "react";
import "./Card.scss";
import Answer from "../../common/Answer/Answer";
import logo from "../../../assets/undraw_adventure_4hum.svg";

const Card: React.FC = (props: any): JSX.Element => {
  const letters: Array<string> = ["A", "B", "C", "D"];

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__title">Country quiz</div>
        <img src={logo} alt="Country quiz" className="card__header-logo" />
      </div>
      <div className="game-container">
        <div className="game-container__question-container">
          {props.flag && (
            <img src={props.flag} alt={props.name} className="flag-img" />
          )}
          <div className="question">{props.text}</div>
        </div>
        <div className="answers-container">
          {props.answers.map((el: string, index: number) => (
            <Answer
              click={props.click}
              text={el}
              key={index}
              letter={letters[index]}
              isCorrect={props.isCorrect}
            />
          ))}
        </div>
        {props.next && (
          <button className="next" onClick={props.handleNext}>
            {props.counter === 9 ? "Results" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
