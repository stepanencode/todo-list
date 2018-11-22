
import { reducer as formReducer } from 'redux-form';
// import { todoReducer } from "./reducers";
import { createStore } from 'redux';
// let store = createStore(rootReducer);

import  { rootReducer } from "./reducers/index";



const store = createStore(rootReducer)
console.log(store.getState())

export default store;
