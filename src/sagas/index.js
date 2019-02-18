import { all } from "redux-saga/effects";

import { watchfetchRadioSaga } from "./radio";
import { watchfetchTestTextSaga } from "./testText";
import { watchfetchTodoSaga } from "./todo";


export default function* rootSaga() {
  yield all([
    watchfetchRadioSaga(),
    watchfetchTestTextSaga(),
    watchfetchTodoSaga()
  ])
}
