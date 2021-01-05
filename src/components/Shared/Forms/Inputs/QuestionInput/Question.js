import PropTypes from "prop-types";
import Input from "../Input";
import AnswerInput from "./AnswerInput";

export default function Question({ index, register, errors }) {
  const answersJSX = [];
  console.log(answersJSX);
  for (let i = 1; i <= 4; i++) {
    answersJSX.push(
      <AnswerInput
        key={i}
        index={i}
        questionIndex={index}
        register={register}
      />
    );
  }

  return (
    <div className="question">
      <Input
        id={"q" + index}
        label={"Question " + index}
        register={register}
        isRequired={true}
        placeholder="Enter your question"
        type="text"
        errorMessage={errors["q" + index]}
      />
      <fieldset>
        <legend>Answers</legend>
        {answersJSX}
      </fieldset>
    </div>
  );
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
};
