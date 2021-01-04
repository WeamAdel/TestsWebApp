import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/sign-in"} exact component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
