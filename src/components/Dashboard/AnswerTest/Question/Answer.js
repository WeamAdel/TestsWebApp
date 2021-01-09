import PropTypes from "prop-types";
import Radio from "../../../Shared/Forms/Inputs/Radio";

export default function Answer({
  answer,
  index,
  questionIndex,
  rightAnswerIndex,
  register,
  name,
  isAnswered,
  userAnswerIndex,
}) {
  const id = "a" + index;
  const right = isAnswered && rightAnswerIndex == index ? " right-answer" : "";
  const selected = isAnswered && userAnswerIndex == index ? " selected" : "";
  return (
    <li className={"answer custom-radio" + right + selected}>
      <Radio
        classes="d-none"
        id={id}
        register={register}
        label={`Question ${questionIndex} answer ${index}`}
        value={index}
        name={name}
        isDisabled={isAnswered}
      />
      <p>{answer}</p>
    </li>
  );
}
