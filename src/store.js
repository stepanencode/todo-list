import { createStore } from 'redux';
const rootReducer = (state={}, action) => state
// const rootReducer = (state={}, action) => state {
//   switch (action.type) {
//     default:
//       return state
//   }
// }​
const store = createStore(rootReducer);
export default store;
