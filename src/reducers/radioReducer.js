import constants from "../actions";

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
  case constants.FETCH_RADIO_MESSAGE_BEGIN:
    return Object.assign({}, state, {
      fetching: true
    });
  case constants.FETCH_RADIO_MESSAGE_SUCCESS:
    return Object.assign({}, state, {
      fetching: false,
      message: {
        "on": action.message.on,
        "off": action.message.off
      }
    });
  case constants.FETCH_RADIO_MESSAGE_FAILURE:
    return Object.assign({}, state, {
      fetching: false,
      error: action.error
    });
  default:
    return state;
  }
};

export default radioReducer;
