import { takeLatest, call, put } from "redux-saga/effects";

import { api } from "./api";
import { fetchTestTextMessageSuccess, fetchTestTextMessageFailure, FETCH_TEST_TEXT_MESSAGE_BEGIN } from "../actions/testText";

function fetchTestText() {
  return api({
    method: "get",
    url: "/test/"
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
  yield takeLatest(FETCH_TEST_TEXT_MESSAGE_BEGIN, fetchTestTextSaga);
}
