import React, { Fragment, useEffect } from "react";
// CSS
import "./App.css";
// COMPONENTS
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// REDUX
import store from "./store";
import { LOGOUT } from "./actions/types";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
