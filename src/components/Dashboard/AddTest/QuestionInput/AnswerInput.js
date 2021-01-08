import PropTypes from "prop-types";
import ErrorMessage from "../../../Shared/Forms/ErrorMessage";
import Radio from "../../../Shared/Forms/Inputs/Radio";

export default function AnswerInput({
  questionIndex,
  questionId,
  id,
  index,
  name,
  rightAnswer,
  register,
  errorMessage,
  defaultValue,
}) {
  const isRight = rightAnswer.index == index;
  return (
    <div className="form-group answer">
      <label className="d-none" htmlFor={id}>{`Question ${
        questionIndex + 1
      } answer ${index + 1}`}</label>

      <div className="inputs">
        <input
          id={id}
          name={name}
          type="text"
          placeholder={`Answer ${index + 1}...`}
          className={"input form-control " + (errorMessage ? "invalid" : "")}
          ref={register()}
          defaultValue={defaultValue}
        />
        <div className={"custom-radio" + (isRight ? " right" : "")}>
          <Radio
            classes="d-none"
            label={`Question ${questionIndex} right answer`}
            id={"rightAnswer" + index + questionId}
            name={rightAnswer.name}
            value={index}
            register={register}
            defaultChecked={isRight}
          />
        </div>
      </div>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
}

AnswerInput.propTypes = {
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  rightAnswer: PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  register: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
};
