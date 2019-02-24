import { takeLatest, call, put } from "redux-saga/effects";

import { api } from "./api";
import { editTodoSuccess, editTodoFailure, EDIT_TODO_BEGIN } from "../actions/todo";

function editTodo(id, item) {
  return api({
    method: "patch",
    url: `/todos/${id}/`,
    data: item
  });
}

function* editTodoSaga(action) {
  try {
    const response = yield call(editTodo, action.id, action.item);
    yield put(editTodoSuccess(action.id, response.data));
  } catch (error) {
    yield put(editTodoFailure(error));
  }
}

export function* watcheditTodoSaga() {
  yield takeLatest(EDIT_TODO_BEGIN, editTodoSaga);
}
