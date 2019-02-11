import { combineReducers } from 'redux';
import { todoReducer } from "./todoReducer";
import { radioReducer } from "./radioReducer";
import { testTextReducer } from "./testTextReducer";
import { reducer as formReducer } from 'redux-form';

export const rootReducer  = combineReducers({
  todo: todoReducer,
  form: formReducer,
  radio: radioReducer,
  testText: testTextReducer,
})

export default rootReducer;
