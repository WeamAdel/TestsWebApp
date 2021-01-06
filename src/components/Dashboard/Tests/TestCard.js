import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TestCard({ id, name, questionsCount }) {
  return (
    <li>
      <Link to={"/dashboard/test/" + id}>
        <h2>{name}</h2>
        <ul className="list-unstyled p-0">
          <li className="info-card d-flex flex-column-reverse">
            <p className="mb-0">Questions</p>
            <div>
              <i className="fa fa-question-circle" />
              <p className="mb-0">{questionsCount}</p>
            </div>
          </li>
        </ul>
      </Link>
    </li>
  );
}

TestCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  questionsCount: PropTypes.number.isRequired,
};
