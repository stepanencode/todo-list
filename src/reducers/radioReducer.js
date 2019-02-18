import {
  FETCH_RADIO_MESSAGE_BEGIN,
  FETCH_RADIO_MESSAGE_SUCCESS,
  FETCH_RADIO_MESSAGE_FAILURE
} from "../actions/radio";

const initialState = {
  fetching: false,
  error: null,
  message: {
    "on": null,
    "off": null,
  }
}

export const radioReducer = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_RADIO_MESSAGE_BEGIN:
    return Object.assign({}, state, {
      fetching: true
    });
  case FETCH_RADIO_MESSAGE_SUCCESS:
    return Object.assign({}, state, {
      fetching: false,
      message: {
        "on": action.message.on,
        "off": action.message.off
      }
    });
  case FETCH_RADIO_MESSAGE_FAILURE:
    return Object.assign({}, state, {
      fetching: false,
      error: action.error
    });
  default:
    return state;
  }
};

export default radioReducer;
