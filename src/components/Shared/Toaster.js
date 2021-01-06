import PropTypes from "prop-types";

export default function Toaster({ type, message, show }) {
  return (
    <p className={`toaster ${type} ${show ? "show" : ""}`}>
      <i className={`fa fa-${type == "success" ? "check-circle" : "bug"}`} />{" "}
      {message}
    </p>
  );
}

Toaster.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.any,
};
