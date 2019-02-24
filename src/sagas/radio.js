import { takeLatest, call, put } from "redux-saga/effects";

import { api } from "./api";
import { fetchRadioMessageSuccess, fetchRadioMessageFailure, FETCH_RADIO_MESSAGE_BEGIN  } from "../actions/radio";

function fetchRadio() {
  return api({
    method: "get",
    url: "/radio"
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
