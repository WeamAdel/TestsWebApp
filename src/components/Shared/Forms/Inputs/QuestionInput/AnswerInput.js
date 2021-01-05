import PropTypes from "prop-types";
import ErrorMessage from "../../ErrorMessage";

export default function AnswerInput({
  errorMessage,
  index,
  questionIndex,
  register,
}) {
  const questionId = "q" + questionIndex;
  const id = questionId + "-a" + index;

  return (
    <div className="form-group answer">
      <label
        className="d-none"
        htmlFor={id}
      >{`Question ${questionIndex} answer ${index}`}</label>

      <div className="inputs">
        <input
          id={id}
          name={id}
          type="text"
          placeholder={`Answer ${index}...`}
          className={"input form-control " + (errorMessage ? "invalid" : "")}
          ref={register}
        />
        <div className="radio-wrapper">
          <input
            id={"rightAnswer" + index + questionId}
            name={"rightAnswer" + questionId}
            type="radio"
          />
          <div className="custom-radio">
            <i className="fa fa-check-circle" />
          </div>
        </div>
      </div>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
}

AnswerInput.propTypes = {
  index: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  register: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
};
