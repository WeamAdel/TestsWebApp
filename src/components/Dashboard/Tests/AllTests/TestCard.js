import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TestCard({ testerId, testId, name, questionsCount }) {
  return (
    <li className="test-card">
      <Link to={"/dashboard/test/" + testerId + "/" + testId}>
        <h3>{name}</h3>
        <p className="mb-0">
          <i className="fa fa-question-circle" /> {questionsCount}
        </p>
      </Link>
    </li>
  );
}

TestCard.propTypes = {
  testerId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  questionsCount: PropTypes.number.isRequired,
};
