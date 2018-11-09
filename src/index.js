import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppContainer}/>
        <Route path="/login" component={LogInForm}/>
        <Route path="/signup" component={SignUpForm}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
