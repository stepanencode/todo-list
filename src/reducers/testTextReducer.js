import constants from "../actions";

const initialState = {
  fetching: false,
  error: null,
  text: null,
}

export const testTextReducer = (state=initialState, action) => {
  switch (action.type) {
  case constants.FETCH_TEST_TEXT_MESSAGE_BEGIN:
    return Object.assign({}, state, {
      fetching: true
    });
  case constants.FETCH_TEST_TEXT_MESSAGE_SUCCESS:
    return Object.assign({}, state, {
      fetching: false,
      message: action.message.text
    });
  case constants.FETCH_TEST_TEXT_MESSAGE_FAILURE:
    return Object.assign({}, state, {
      fetching: false,
      error: action.error
    });
  default:
    return state;
  }
};

export default testTextReducer;
