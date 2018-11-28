import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import LogInFormContainer from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReduxForm from "./ReduxForm";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppContainer}/>
        <Route path="/login" component={LogInFormContainer}/>
        <Route path="/signup" component={SignUpForm}/>
        <Route path="/form" component={ReduxForm}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
