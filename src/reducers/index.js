import { combineReducers } from 'redux';
import { todoReducer } from "./todoReducer";
import { reducer as formReducer } from 'redux-form';

export const rootReducer  = combineReducers({
  todo: todoReducer,
  form: formReducer
})

export default rootReducer;
