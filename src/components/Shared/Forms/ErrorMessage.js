import PropTypes from "prop-types";

export default function ErrorMessage({ message }) {
  return <p className="error-message mb-0">{message}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
