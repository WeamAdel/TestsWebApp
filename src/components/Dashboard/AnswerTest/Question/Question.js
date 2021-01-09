import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Answer from "./Answer";
import ErrorMessage from "../../../Shared/Forms/ErrorMessage";

export default function Question({
  question,
  answers,
  userAnswerIndex,
  index,
  rightAnswerIndex,
  register,
  isAnswered,
  errorMessage,
}) {
  const [result, setResult] = useState("");

  useEffect(() => {
    if (isAnswered) {
      const answerResult =
        userAnswerIndex == rightAnswerIndex ? " right" : " wrong";
      setResult(answerResult);
    }
  }, [isAnswered]);

  const answersJSX = answers.map((answer, i) => {
    return (
      <Answer
        register={register}
        key={i}
        answer={answer}
        index={i}
        questionIndex={index}
        rightAnswerIndex={rightAnswerIndex}
        userAnswerIndex={userAnswerIndex}
        name={`answers[${index}].value`}
        isAnswered={isAnswered}
      />
    );
  });

  return (
    <li className={"question" + result}>
      <h2>{question}</h2>
      <ul className="list-unstyled p-0">{answersJSX}</ul>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      <hr />
    </li>
  );
}
