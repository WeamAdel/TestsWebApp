import PropTypes from "prop-types";
import Input from "../Input";
import AnswerInput from "./AnswerInput";

export default function Question({
  index,
  id,
  name,
  answers,
  rightAnswer,
  register,
  errors,
  removeQuestion,
}) {
  const answersJSX = answers.map((answer, index) => {
    return (
      <AnswerInput
        key={answer.id}
        rightAnswer={rightAnswer}
        questionIndex={index}
        questionId={id}
        index={index}
        register={register}
        {...answer}
      />
    );
  });

  return (
    <div className="question">
      {index != 0 ? (
        <button className="remove-question-btn" onClick={removeQuestion}>
          <i className="fa fa-trash" />
        </button>
      ) : null}
      <Input
        id={id}
        name={name}
        label={"Question " + (index + 1)}
        register={register}
        isRequired={true}
        placeholder="Enter your question"
        type="text"
        // errorMessage={errors["q" + index]}
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
  id: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  rightAnswer: PropTypes.object.isRequired,
  register: PropTypes.any.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  errors: PropTypes.object,
};
