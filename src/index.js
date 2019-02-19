import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./Components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import LogInForm from "./Components/LogInPage/LogInForm/index";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUpForm from "./Components/SignUpPage/SignUpForm/index";
import User from "./Components/UserPage/User/index";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppContainer}/>
        <Route path="/login" component={LogInForm}/>
        <Route path="/signup" component={SignUpForm}/>
        <Route path="/user" component={User}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
