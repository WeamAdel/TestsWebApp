import PropTypes from "prop-types";
import TestCard from "./TestCard";
import NoData from "../../../Shared/NoData";
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
        <div className="tests-col col-lg-7 mb-5 mb-lg-0">
          <h1 className="underline">Your Tests</h1>
          {testsJSX ? (
            <ul className="cards admin-cards list-unstyled p-0 m-0">
              {testsJSX}
            </ul>
          ) : (
            <NoData
              text="You did not add any tests yet!"
              link={{ title: "Add Test", to: "/dashboard/test" }}
            />
          )}
        </div>
        <RecentAnswers answers={null} />
      </div>
    </div>
  );
}

AdminTests.propTypes = {
  tests: PropTypes.object,
};
