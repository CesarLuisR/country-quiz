import { useState, useEffect } from "react";
import axios from "axios";

const useRandomQuestion = (answers: any): object | any => {
  const [question, setQuestion] = useState<object | undefined>();
  const url = "https://restcountries.eu/rest/v2/all";

  const generateQuestion = async (): Promise<void> => {
    const resp = await axios.get<object[] | any>(url);

    const getRandomNumber = (min: number, max: number): number =>
      Math.round(Math.random() * (max - min)) + min;

    const length: number = resp.data.length - 1;
    const randomQuestionNumber: number = getRandomNumber(0, length);

    const location = await resp.data[randomQuestionNumber];

    interface Ifilter {
      type: string;
      falseAnswers: object[];
      trueAnswer: string | any;
    }

    // falses answers
    let falseAnswers: Array<object> = [];

    for (let i: number = 0; i < 3; i++) {
      const newRandomQuestionNumber = getRandomNumber(0, length);
      let randomLocation = resp.data[newRandomQuestionNumber];
      falseAnswers.push({
        capital: randomLocation.capital,
        name: randomLocation.name,
        region: randomLocation.region,
      });
    }

    const filterAndSortAnswers = (params: Ifilter): Array<string> => {
      const answers = [...params.falseAnswers, params.trueAnswer];
      let filterAnswers: Array<string> = [""];

      if (params.type === "name")
        filterAnswers = answers.map((answer) => answer.name || answer);
      else if (params.type === "capital")
        filterAnswers = answers.map((answer) => answer.capital || answer);
      else filterAnswers = answers.map((answer) => answer.region || answer);

      return filterAnswers.sort();
    };

    const possibleQuestions: Array<object> = [
      {
        text: "Which country does this flag belong to?",
        type: "name",
        correct: location.name,
        flag: location.flag,
        answers: filterAndSortAnswers({
          type: "name",
          falseAnswers,
          trueAnswer: location.name,
        }),
      },
      {
        text: `${location.capital} is the capital of`,
        type: "capital",
        correct: location.name,
        flag: false,
        answers: filterAndSortAnswers({
          type: "name",
          falseAnswers,
          trueAnswer: location.name,
        }),
      },
      {
        text: `What region does ${location.name} belong to?`,
        type: "region",
        correct: location.region,
        flag: false,
        answers: filterAndSortAnswers({
          type: "region",
          falseAnswers,
          trueAnswer: location.region,
        }),
      },
    ];

    let newLength = possibleQuestions.length - 1;
    const randomPossibleQuestionNumber: number = getRandomNumber(0, newLength);

    setQuestion(possibleQuestions[randomPossibleQuestionNumber]);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  if (question) return question;
};

export default useRandomQuestion;
