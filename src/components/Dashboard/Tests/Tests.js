import Page from "../../Layout/Page";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from "../../../configs/firebase";
import PageSpinner from "../../Shared/Spinners/PageSpinner";
import AdminTests from "./AdminTests/AdminTests";
import AllTests from "./AllTests/AllTests";

function Tests({ app, isLogged, user }) {
  const [tests, setTests] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  //Get all user's tests if logged
  useEffect(() => {
    if (isLogged == true && app.uid && user.isAdmin != null) getAPITests();
  }, [isLogged, user.isAdmin]);

  function getAPITests() {
    // if the user is admin, get its tests, if not get all tests
    const url = user.isAdmin ? "tests/" + app.uid : "tests";
    firebase
      .database()
      .ref(url)
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
      .catch((error) => {
        console.log(error);
      });
  }

  return tests.isLoading ? (
    <PageSpinner />
  ) : (
    <Page classes="dashboard tests">
      {user.isAdmin != null ? (
        user.isAdmin ? (
          <AdminTests tests={tests.data} />
        ) : (
          <AllTests tests={tests.data} />
        )
      ) : null}
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.user.isLogged,
    app: state.auth.app,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Tests);
