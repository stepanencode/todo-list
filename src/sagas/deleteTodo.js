import { takeLatest, call, put } from "redux-saga/effects";

import { api } from "./api";
import { deleteTodoSuccess, deleteTodoFailure, DELETE_TODO_BEGIN } from "../actions/todo";

function deleteTodo(id) {
  return api({
    method: "delete",
    url: `/todos/${id}/`
  });
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodo, action.id);
    yield put(deleteTodoSuccess(action.id));
  } catch (error) {
    yield put(deleteTodoFailure(error));
  }
}

export function* watchdeleteTodoSaga() {
  yield takeLatest(DELETE_TODO_BEGIN, deleteTodoSaga);
}
