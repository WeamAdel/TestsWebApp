import PropTypes from "prop-types";

export default function Radio({
  label,
  classes,
  name,
  id,
  register,
  value,
  defaultValue,
  defaultChecked,
  isDisabled,
}) {
  return (
    <>
      <label className={classes ?? ""} htmlFor={id}>
        {label}
      </label>
      <input
        ref={register()}
        type="radio"
        name={name}
        value={value}
        defaultValue={defaultValue}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
      />
      <i className="fa fa-check-circle" />
    </>
  );
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  classes: PropTypes.string,
  value: PropTypes.number,
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
