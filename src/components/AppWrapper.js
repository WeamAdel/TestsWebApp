import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setAppData } from "../redux/auth/ActionCreators";
import PageSpinner from "./Shared/Spinners/PageSpinner";

function AppWrapper({ children, setAppData }) {
  const [appDataStatus, setAppDataStatus] = useState(false);

  useEffect(() => {
    getAppDate()
      .then((data) => {
        setAppDataStatus(true);
        setAppData(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return appDataStatus ? children : <PageSpinner />;
}

//Read app data form localStorage
async function getAppDate(params) {
  const data = await localStorage.getItem("app");
  return await JSON.parse(data);
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAppData: (appData) => {
      dispatch(setAppData(appData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
