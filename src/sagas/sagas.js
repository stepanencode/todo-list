import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// import { fetchRadioMessageSuccess, fetchRadioMessageFailure } from "../reducers/radioReducer";
import { fetchRadioMessageSuccess, fetchRadioMessageFailure } from "../actions";

import { fetchTestTextMessageSuccess, fetchTestTextMessageFailure } from "../actions";

// TODO: use constants for actions instead of strings

function fetchRadio() {
  return axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/radio"
  });
}

function* fetchRadioSaga() {
  try {
    const response = yield call(fetchRadio);
    yield put(fetchRadioMessageSuccess(response.data));
  } catch (error) {
    yield put(fetchRadioMessageFailure(error));
  }
}

export function* watchfetchRadioSaga() {
  yield takeLatest("FETCH_RADIO_MESSAGE_BEGIN", fetchRadioSaga);
}

//new saga:

function fetchTestText() {
  return axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/test"
  });
}

function* fetchTestTextSaga() {
  try {
    const response = yield call(fetchTestText);
    yield put(fetchTestTextMessageSuccess(response.data));
  } catch (error) {
    yield put(fetchTestTextMessageFailure(error));
  }
}

export function* watchfetchTestTextSaga() {
  yield takeLatest("FETCH_TEST_TEXT_MESSAGE_BEGIN", fetchTestTextSaga);
}
