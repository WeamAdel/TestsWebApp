import PropTypes from "prop-types";
import ErrorMessage from "../ErrorMessage";

export default function Input({
  id,
  name,
  type,
  label,
  placeholder,
  errorMessage,
  isRequired,
  register,
  defaultValue,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}{" "}
        {isRequired ? <sup title="This field is required">*</sup> : null}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        className={"input form-control " + (errorMessage ? "invalid" : "")}
        ref={register()}
        defaultValue={defaultValue}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  register: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
  defaultValue: PropTypes.any,
};
