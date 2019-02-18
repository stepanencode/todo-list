import {
  FETCH_TEST_TEXT_MESSAGE_BEGIN,
  FETCH_TEST_TEXT_MESSAGE_SUCCESS,
  FETCH_TEST_TEXT_MESSAGE_FAILURE
} from "../actions/testText";

const initialState = {
  fetching: false,
  error: null,
  text: null,
}

export const testTextReducer = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_TEST_TEXT_MESSAGE_BEGIN:
    return Object.assign({}, state, {
      fetching: true
    });
  case FETCH_TEST_TEXT_MESSAGE_SUCCESS:
    return Object.assign({}, state, {
      fetching: false,
      message: action.message.text
    });
  case FETCH_TEST_TEXT_MESSAGE_FAILURE:
    return Object.assign({}, state, {
      fetching: false,
      error: action.error
    });
  default:
    return state;
  }
};

export default testTextReducer;
