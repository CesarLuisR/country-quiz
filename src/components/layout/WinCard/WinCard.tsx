import React from "react";
import image from "../../../assets/undraw_winners_ao2o.svg";
import "./WinCard.scss";

const WinCard: React.FC | any = (props: any): JSX.Element => {
  return (
    <div className="win-card">
      <h1 className="win-card__title">Country quiz</h1>
      <div className="win-card__container">
        <img src={image} alt="results" className="win-card__image" />
        <div className="results">
          <h2 className="results__title">Results</h2>
          <div className="results-answers">
            You got <span>{props.data.correct}</span> correct answers
          </div>
        </div>
        <button className="try-again" onClick={props.reset}>Try again</button>
      </div>
    </div>
  );
};

export default WinCard;
