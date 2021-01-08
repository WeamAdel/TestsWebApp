import PropTypes from "prop-types";
import TestCard from "./TestCard";
import NoData from "../NoData";
import RecentAnswers from "./RecentAsnswers";

export default function AdminTests({ tests }) {
  const testsJSX = tests
    ? Object.keys(tests).map((id) => {
        return (
          <TestCard
            key={id}
            id={id}
            name={tests[id].name}
            questionsCount={tests[id].questions.length}
          />
        );
      })
    : null;

  return (
    <div className="admin-tests">
      <div className="row">
        <div className="tests-col col-md-8 mb-5 mb-md-0">
          <h1 className="underline">Your Tests</h1>
          {testsJSX ? (
            <ul className="cards admin-cards list-unstyled p-0 m-0">
              {testsJSX}
            </ul>
          ) : (
            <NoData />
          )}
        </div>
        <RecentAnswers answers={null} />
      </div>
    </div>
  );
}

AdminTests.propTypes = {
  tests: PropTypes.object.isRequired,
};
