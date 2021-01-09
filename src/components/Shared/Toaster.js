import PropTypes from "prop-types";

export default function Toaster({ type, message, show, isFixed }) {
  return (
    <div
      className={`toaster alert ${type} ${show ? "show" : ""} ${
        isFixed ? "fixed" : ""
      }`}
      role="alert"
    >
      <div className="icon">
        <i className={`fa fa-${type === "success" ? "check" : "bug"}`} />{" "}
      </div>
      <span>{message}</span>
    </div>
  );
}

Toaster.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.any,
  isFixed: PropTypes.bool,
};
