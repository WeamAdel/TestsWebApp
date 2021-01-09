import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import AppWrapper from "./components/AppWrapper";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import store from "./redux/ConfigureStore";
import ErorrBoundary from "./components/Errors/ErrorBoundary";
import NotFoundPage from "./components/Errors/Error404";

function App() {
  return (
    <ErorrBoundary>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <AppWrapper>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/sign-in" exact component={SignIn} />
                <Route path="/sign-up" exact component={SignUp} />
                <Route path="/" component={NotFoundPage} />
              </Switch>
            </AppWrapper>
          </BrowserRouter>
        </div>
      </Provider>
    </ErorrBoundary>
  );
}

export default App;
