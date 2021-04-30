import { useState, useEffect } from "react";
import axios from "axios";

const useRandomQuestion = (): object | undefined => {
  const [question, setQuestion] = useState<object | undefined>();

  const getRandomNumber = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  const generateQuestion = async (): Promise<void> => {
    const randomQuestionNumber: number = getRandomNumber(0, 250);
    const randomPossibleQuestionNumber: number = getRandomNumber(0, 2);

    const resp = await axios.get("https://restcountries.eu/rest/v2/all");
    const location = await resp.data[randomQuestionNumber];

    const possibleQuestions: Array<string> = [
      "Which country does this flag belong to?",
      `${location.capital} is the capital of`,
      `What region does ${location.name} belong to?`,
    ];

    let falseAnswers: Array<object> = [];

    for (let i: number = 0; i < 3; i++) {
      const newRandomQuestionNumber = getRandomNumber(0, 250);
      let randomLocation = resp.data[newRandomQuestionNumber];
      falseAnswers.push({
        capital: randomLocation.capital,
        name: randomLocation.name,
        region: randomLocation.region,
      });
    }

    setQuestion({
      questionText: possibleQuestions[randomPossibleQuestionNumber],
      name: location.name,
      capital: location.capital,
      flag: location.flag,
      region: location.region,
      falseAnswer: falseAnswers,
    });
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (question) return question;;
};

export default useRandomQuestion;
