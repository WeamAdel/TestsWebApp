import PropTypes from "prop-types";
import ErrorMessage from "../../ErrorMessage";

export default function AnswerInput({
  questionIndex,
  questionId,
  id,
  index,
  name,
  value,
  rightAnswer,
  register,
  errorMessage,
}) {
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
        />
        <div className="radio-wrapper">
          <input
            id={"rightAnswer" + index + questionId}
            name={rightAnswer.name}
            type="radio"
            value={index}
            ref={register()}
            defaultChecked={rightAnswer.index == index}
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
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  rightAnswer: PropTypes.shape({
    index: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  register: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
};
