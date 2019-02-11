import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from "./reducers/index";
import { watchfetchRadioSaga } from './sagas/sagas';
import { watchfetchTestTextSaga } from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchfetchRadioSaga);

sagaMiddleware.run(watchfetchTestTextSaga);
console.log(store.getState())

export default store;
