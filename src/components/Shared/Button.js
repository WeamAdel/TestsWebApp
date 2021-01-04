import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ title, classes, link, clicked }) {
  return (
    <button className={"btn " + classes} onClick={clicked ? clicked : null}>
      {link ? (
        <Link href={link}>
          <a href={link}>{title}</a>
        </Link>
      ) : (
        title
      )}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  link: PropTypes.string,
  clicked: PropTypes.func,
};

export default Button;
