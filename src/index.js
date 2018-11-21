import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
// import store from "./store";
import LogInFormContainer from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { combineReducers } from 'redux';

import { rootReducer } from "./reducers";

const reducer  = combineReducers({
  rootReducer
})


const store = createStore(reducer)
console.log(store.getState())


ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppContainer}/>
        <Route path="/login" component={LogInFormContainer}/>
        <Route path="/signup" component={SignUpForm}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
