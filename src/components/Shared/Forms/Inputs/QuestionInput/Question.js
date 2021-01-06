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
  question,
}) {
  const answersJSX = answers.map((answer, index) => {
    const answerId = id + "a" + (index + 1);
    return (
      <AnswerInput
        key={answerId}
        rightAnswer={rightAnswer}
        questionIndex={index}
        questionId={id}
        index={index}
        register={register}
        id={answerId}
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
        defaultValue={question}
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
  id: PropTypes.string,
  answers: PropTypes.array.isRequired,
  rightAnswer: PropTypes.object.isRequired,
  register: PropTypes.any.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  errors: PropTypes.object,
};
