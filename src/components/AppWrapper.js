import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAppData, doLogout } from "../redux/auth/ActionCreators";
import firebase from "../configs/firebase";
import PageSpinner from "./Shared/Spinners/PageSpinner";
import Navbar from "./Layout/Navbar";

function AppWrapper({
  children,
  setAppData,
  getAPIUser,
  history,
  isLogged,
  user,
  doLogout,
}) {
  const [appDataStatus, setAppDataStatus] = useState(false);

  //Read app data from localStorage
  useEffect(() => {
    getAppDate()
      .then(async (data) => {
        if (data && data.uid) {
          const { email, username, isAdmin } = await getAPIUser(data.uid);
          setAppData({
            uid: data.uid,
            apiToken: data.apiToken,
            email,
            username,
            isAdmin,
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

    return userData;
  }

  //Redirect logged users to dashboard
  useEffect(() => {
    const notInDahsboard = history.location.pathname.indexOf("dashboard") < 0;
    if (isLogged === true && notInDahsboard) history.push("/dashboard");
  }, [isLogged]);
  return appDataStatus && isLogged != null ? (
    <div>
      <Navbar doLogout={doLogout} user={user} />
      {children}
    </div>
  ) : (
    <PageSpinner />
  );
}

//Read app data form localStorage
async function getAppDate(params) {
  const data = await localStorage.getItem("app");
  return await JSON.parse(data);
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
    user: state.auth.user,
    isLogged: state.auth.user.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAppData: (appData) => {
      dispatch(setAppData(appData));
    },
    doLogout: () => {
      dispatch(doLogout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppWrapper));
