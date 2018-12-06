import { createStore, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage

import thunk from "redux-thunk"
import rootReducer from "./reducers"
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const initialState = {}
const middleware = [thunk]

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(
    //  Apply middleware and Redux Dev Tools
    applyMiddleware(...middleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store)
