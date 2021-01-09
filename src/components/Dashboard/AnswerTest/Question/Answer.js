import PropTypes from "prop-types";
import Radio from "../../../Shared/Forms/Inputs/Radio";

export default function Answer({
  answer,
  index,
  questionIndex,
  rightAnswerIndex,
  register,
  name,
}) {
  const id = "a" + index;
  return (
    <li className="answer custom-radio">
      <Radio
        classes="d-none"
        id={id}
        register={register}
        label={`Question ${questionIndex} answer ${index}`}
        value={index}
        name={name}
      />
      <p>{answer}</p>
    </li>
  );
}
