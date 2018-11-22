import { combineReducers } from 'redux';

import { todoReducer } from "./todo_reducer";

export const rootReducer  = combineReducers({
  todoReducer
})

export default rootReducer;
