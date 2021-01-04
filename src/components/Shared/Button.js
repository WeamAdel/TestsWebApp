import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "./Spinners/Spinner";

function Button({ title, classes, link, clicked, isLoading }) {
  return (
    <button
      className={"btn " + classes}
      onClick={clicked ? clicked : null}
      disabled={isLoading == true}
    >
      {link ? (
        <Link href={link}>
          <a href={link}>{title}</a>
        </Link>
      ) : (
        <span>
          {title}
          {isLoading == true ? <Spinner /> : null}
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  link: PropTypes.string,
  clicked: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Button;
