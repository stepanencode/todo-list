import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from "./reducers/index";
import { watchfetchRadioSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchfetchRadioSaga);

console.log(store.getState())

export default store;
