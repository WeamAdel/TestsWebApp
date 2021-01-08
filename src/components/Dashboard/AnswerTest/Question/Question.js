import PropTypes from "prop-types";
import Answer from "./Answer";

export default function Question({
  question,
  answers,
  index,
  rightAnswerIndex,
  register,
}) {
  const answersJSX = answers.map((answer, i) => {
    return (
      <Answer
        register={register}
        key={i}
        answer={answer}
        index={i}
        questionIndex={index}
        rightAnswerIndex={rightAnswerIndex}
        name={`answers[${index}].name`}
      />
    );
  });

  return (
    <li className="question">
      <h2>{question}</h2>
      <ul className="list-unstyled p-0">{answersJSX}</ul>
      <hr />
    </li>
  );
}
