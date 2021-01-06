import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Tests from "./Tests/Tests";
import Test from "./AddTest/AddTest";
import Navbar from "../Layout/Navbar";

function Dashboard({ history, isLogged }) {
  // Redirect user to sign in if not authorized
  useEffect(() => {
    if (isLogged == false) {
      history.push("/sign-in");
    }
  }, [isLogged]);

  return (
    <div className="dashboard">
      <Navbar />
      <Switch>
        <Route path={"/dashboard/test"} component={Test} />
        <Route path={"/dashboard/test/:id"} component={Test} />
        <Route path={"/"} component={Tests} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.user.isLogged,
  };
};

export default connect(mapStateToProps)(Dashboard);
