import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAppData } from "../redux/auth/ActionCreators";
import PageSpinner from "./Shared/Spinners/PageSpinner";

function AppWrapper({ children, setAppData, history, isLogged }) {
  const [appDataStatus, setAppDataStatus] = useState(false);

  //Read app data from localStorage
  useEffect(() => {
    getAppDate()
      .then((data) => {
        setAppDataStatus(true);
        setAppData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Redirect logged users to dashboard
  useEffect(() => {
    if (isLogged == true) {
      history.push("/dashboard");
    }
  }, [isLogged]);
  return appDataStatus && isLogged != null ? children : <PageSpinner />;
}

//Read app data form localStorage
async function getAppDate(params) {
  const data = await localStorage.getItem("app");
  return await JSON.parse(data);
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
    isLogged: state.auth.user.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAppData: (appData) => {
      dispatch(setAppData(appData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppWrapper));
