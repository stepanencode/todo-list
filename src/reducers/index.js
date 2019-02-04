import { combineReducers } from 'redux';
import { todoReducer } from "./todoReducer";
import { radioReducer } from "./radioReducer";
import { reducer as formReducer } from 'redux-form';

export const rootReducer  = combineReducers({
  todo: todoReducer,
  form: formReducer,
  radio: radioReducer,
})

export default rootReducer;
