import { takeLatest, call, put } from "redux-saga/effects";

import { api } from "./api";
import { fetchTodoSuccess, fetchTodoFailure, FETCH_TODO_BEGIN } from "../actions/todo";

function fetchTodo() {
  return api({
    method: "get",
    url: "/todos/"
  });
}

function* fetchTodoSaga() {
  try {
    const response = yield call(fetchTodo);
    yield put(fetchTodoSuccess(response.data));
  } catch (error) {
    yield put(fetchTodoFailure(error));
  }
}

export function* watchfetchTodoSaga() {
  yield takeLatest(FETCH_TODO_BEGIN, fetchTodoSaga);
}
