import {configureStore} from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

// create saga middleware
const sagaMiddleware = createSagaMiddleware()

// create redux store with configurations
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

// run the root saga
sagaMiddleware.run(rootSaga);

export default store;
