import { Route, Switch } from "react-router-dom";
import Test from "./AddTest/AddTest";
import Navbar from "../Layout/Navbar";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <Switch>
        <Route path={"/dashboard/test"} component={Test} />
      </Switch>
    </div>
  );
}
