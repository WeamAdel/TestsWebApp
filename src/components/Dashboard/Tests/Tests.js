import Page from "../../Layout/Page";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from "../../../configs/firebase";
import PageSpinner from "../../Shared/Spinners/PageSpinner";
import TestCard from "./TestCard";

function Tests({ app, isLogged }) {
  const [tests, setTests] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  //Get all user's tests if logged
  useEffect(() => {
    if (isLogged == true && app.uid) {
      getAPITests();
    }
  }, [isLogged]);

  function getAPITests() {
    firebase
      .database()
      .ref("tests/" + app.uid)
      .once("value")
      .then((snapshot) => {
        const tests = snapshot.val();
        console.log(tests);
        setTests({
          isLoading: false,
          data: tests,
          error: null,
        });
      })
      .then((error) => {
        console.log(error);
      });
  }

  const testsData = tests.data;
  const testsJSX = testsData
    ? Object.keys(testsData).map((id) => {
        return (
          <TestCard
            key={id}
            id={id}
            name={testsData[id].name}
            questionsCount={testsData[id].questions.length}
          />
        );
      })
    : null;

  return tests.isLoading ? (
    <PageSpinner />
  ) : (
    <Page classes="tests">
      <h1>Tests</h1>;<ul className="list-unstyled p-0 m-0">{testsJSX}</ul>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.user.isLogged,
    app: state.auth.app,
  };
};

export default connect(mapStateToProps)(Tests);
