import { takeLatest, call, put } from "redux-saga/effects";

import { api } from "./api";
import { createTodoSuccess, createTodoFailure, CREATE_TODO_BEGIN } from "../actions/todo";

function createTodo(item) {
  return api({
    method: "post",
    url: "/todos/",
    data: item
  });
}

function* createTodoSaga(action) {
  try {
    const response = yield call(createTodo, action.item);
    yield put(createTodoSuccess(response.data));
  } catch (error) {
    yield put(createTodoFailure(error));
  }
}

export function* watchcreateTodoSaga() {
  yield takeLatest(CREATE_TODO_BEGIN, createTodoSaga);
}
