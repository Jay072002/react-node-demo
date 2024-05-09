import {all} from "redux-saga/effects";
import userWatcher from "./users"

export default function* rootSaga() {
  yield all([
    userWatcher()
  ])
}

