import PropTypes from "prop-types";

export default function RecentAnswers({ answers }) {
  return (
    <div className="col-md-4">
      <div className="recent-answers">
        <h2>Recent Answers</h2>
        {answers ? null : (
          <div className="no-answers text-center my-auto">
            <i className="fa fa-copy fa-3x mb-2" />
            <p className="mb-0">
              You have <em>no</em> answers yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

RecentAnswers.propTypes = {
  answers: PropTypes.array,
};
