import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function NoData({ text, link, imgName = "empty" }) {
  return (
    <div className="no-data">
      <img src={"/assets/images/" + imgName + ".png"} />
      <p className="mb-0">
        {text} {link ? <Link to={link.to}>{link.title}</Link> : null}
      </p>
    </div>
  );
}

NoData.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  imgName: PropTypes.string,
};
