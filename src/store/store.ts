import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from './root.reducer';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhance = (
  process.env.NODE_ENV !== 'production' && window
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const composedEnhancers = composeEnhance(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

// Run saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

