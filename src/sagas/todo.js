import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

import { fetchTodoSuccess, fetchTodoFailure } from "../actions/todo";


function fetchTodo() {
  return axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/todos"
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
  yield takeLatest("FETCH_TODO_BEGIN", fetchTodoSaga);
}
