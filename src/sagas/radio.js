import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

import { fetchRadioMessageSuccess, fetchRadioMessageFailure, FETCH_RADIO_MESSAGE_BEGIN  } from "../actions/radio";

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
  yield takeLatest(FETCH_RADIO_MESSAGE_BEGIN, fetchRadioSaga);
}
