import PropTypes, { object } from "prop-types";
import TestCard from "./TestCard";
import NoData from "../NoData";

export default function AllTests({ tests }) {
  const testsJSX = tests
    ? Object.keys(tests).map((testerId) => {
        const allTests = tests[testerId];
        return Object.keys(allTests).map((testId) => {
          return (
            <TestCard
              key={testId}
              testerId={testerId}
              testId={testId}
              name={allTests[testId].name}
              questionsCount={allTests[testId].questions.length}
            />
          );
        });
      })
    : null;

  return (
    <div className="user-tests">
      <div className="tests-col col-md-8 mb-5 mb-md-0">
        <h1 className="underline">All Tests</h1>
        {testsJSX ? (
          <ul className="cards user-cards list-unstyled p-0 m-0">{testsJSX}</ul>
        ) : (
          <NoData />
        )}
      </div>
      {/* <RecentAnswers answers={null} /> */}
    </div>
  );
}

AllTests.propTypes = {
  tests: PropTypes.object.isRequired,
};
