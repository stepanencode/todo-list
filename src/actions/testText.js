export const FETCH_TEST_TEXT_MESSAGE_BEGIN = "FETCH_TEST_TEXT_MESSAGE_BEGIN";
export const FETCH_TEST_TEXT_MESSAGE_SUCCESS = "FETCH_TEST_TEXT_MESSAGE_SUCCESS";
export const FETCH_TEST_TEXT_MESSAGE_FAILURE = "FETCH_TEST_TEXT_MESSAGE_FAILURE";

export function fetchTestTextMessageBegin() {
  return { type: FETCH_TEST_TEXT_MESSAGE_BEGIN };
}

export function fetchTestTextMessageSuccess(message) {
  return { type: FETCH_TEST_TEXT_MESSAGE_SUCCESS, message: message };
}

export function fetchTestTextMessageFailure(error) {
  return { type: FETCH_TEST_TEXT_MESSAGE_FAILURE, error: error };
}
