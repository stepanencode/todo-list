import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import { fetchRadioMessageSuccess, fetchRadioMessageFailure } from "./reducers/radioReducer";

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
