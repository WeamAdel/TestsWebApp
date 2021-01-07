import PropTypes from "prop-types";

export default function Toaster({ type, message, show }) {
  return (
    <div
      className={`toaster alert ${type} alert-dismissible ${show}`}
      role="alert"
    >
      <div className="icon">
        <i className={`fa fa-${type == "success" ? "double-check" : "bug"}`} />{" "}
      </div>
      <span>{message}</span>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Toaster.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.any,
};
