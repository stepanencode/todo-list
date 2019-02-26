import { all } from "redux-saga/effects";

import { watchfetchRadioSaga } from "./radio";
import { watchfetchTestTextSaga } from "./testText";
import { watchfetchTodoSaga } from "./fetchTodo";
import { watchdeleteTodoSaga } from "./deleteTodo";
import { watchcreateTodoSaga } from "./createTodo";
import { watcheditTodoSaga } from "./editTodo";

export default function* rootSaga() {
  yield all([
    watchfetchRadioSaga(),
    watchfetchTestTextSaga(),
    watchfetchTodoSaga(),
    watchdeleteTodoSaga(),
    watchcreateTodoSaga(),
    watcheditTodoSaga(),
  ])
}
