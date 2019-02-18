export const FETCH_RADIO_MESSAGE_BEGIN = "FETCH_RADIO_MESSAGE_BEGIN";
export const FETCH_RADIO_MESSAGE_SUCCESS = "FETCH_RADIO_MESSAGE_SUCCESS";
export const FETCH_RADIO_MESSAGE_FAILURE = "FETCH_RADIO_MESSAGE_FAILURE";

export function fetchRadioMessageBegin() {
  return { type: FETCH_RADIO_MESSAGE_BEGIN };
}

export function fetchRadioMessageSuccess(message) {
  return { type: FETCH_RADIO_MESSAGE_SUCCESS, message: message };
}

export function fetchRadioMessageFailure(error) {
  return { type: FETCH_RADIO_MESSAGE_FAILURE, error: error };
}
