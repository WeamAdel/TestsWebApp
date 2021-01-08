import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAppData } from "../redux/auth/ActionCreators";
import firebase from "../configs/firebase";
import PageSpinner from "./Shared/Spinners/PageSpinner";

function AppWrapper({ children, setAppData, getAPIUser, history, isLogged }) {
  const [appDataStatus, setAppDataStatus] = useState(false);

  //Read app data from localStorage
  useEffect(() => {
    getAppDate()
      .then(async (data) => {
        if (data.uid) {
          const { email, username } = await getAPIUser(data.uid);
          console.log(email);
          setAppData({
            uid: data.uid,
            apiToken: data.apiToken,
            email,
            username,
          });
        } else setAppData(data);
        setAppDataStatus(true);
      })
      .catch((error) => console.log(error));
  }, []);

  async function getAPIUser(uid) {
    const userData = await firebase
      .database()
      .ref("users/" + uid)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userData);
    return userData;
  }

  //Redirect logged users to dashboard
  useEffect(() => {
    const notInDahsboard = history.location.pathname.indexOf("dashboard") < 0;
    if (isLogged == true && notInDahsboard) history.push("/dashboard");
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
