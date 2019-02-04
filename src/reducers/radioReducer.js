const initialState = {
  fetching: false,
  error: null,
  message: {
    "on": null,
    "off": null,
  }
}
// TODO: move action types and action creators to actions file

// Action types
export const FETCH_RADIO_MESSAGE_BEGIN = 'FETCH_RADIO_MESSAGE_BEGIN';
export const FETCH_RADIO_MESSAGE_SUCCESS = 'FETCH_RADIO_MESSAGE_SUCCESS';
export const FETCH_RADIO_MESSAGE_FAILURE = 'FETCH_RADIO_MESSAGE_FAILURE';

// Action creators
export function fetchRadioMessageBegin() {
  return { type: FETCH_RADIO_MESSAGE_BEGIN };
}

export function fetchRadioMessageSuccess(message) {
  return { type: FETCH_RADIO_MESSAGE_SUCCESS, message: message };
}

export function fetchRadioMessageFailure(error) {
  return { type: FETCH_RADIO_MESSAGE_FAILURE, error: error };
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
