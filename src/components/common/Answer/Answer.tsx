import "./Answer.scss";
import { useEffect, useRef } from "react";

const Answer = (props: any) => {
  const answerRef = useRef<any>();

  useEffect(() => {
    if (typeof props.isCorrect === "string") answerRef.current.style = "none";
  }, [props]);

  return (
    <div
      ref={answerRef}
      className={
        typeof props.isCorrect === "string"
          ? "answer"
          : "no-answer"
      }
      onClick={props.click}
    >
      <div className="letter">{props.letter}</div>
      <div className="text">{props.text}</div>
    </div>
  );
};

export default Answer;
