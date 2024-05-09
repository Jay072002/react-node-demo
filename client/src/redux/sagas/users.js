import {takeEvery, put, call} from "redux-saga/effects"
import { CREATE_USER, CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_FAIL, DELETE_USER_SUCCESS, GET_USERS, GET_USERS_FAIL, GET_USERS_SUCCESS } from '../actions/users'
import { doDelete, doGet, doPost } from '../../request'
import {all} from "redux-saga/effects";

function* getUsers({payload}) {
  try {
    let url = 'user'
    if(payload) {
      if(payload?.query) {
        url = `user?${payload?.query}`
      }
    }
    const response = yield call(doPost, url, payload?.body)
    yield put({ type: GET_USERS_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_USERS_FAIL, payload: error })
  }
}

function* createUser(action) {
  try {
    const payload = action.payload;
    const response = yield call(doPost, 'user/register', payload, {headers: {
      'Content-Type': 'multipart/form-data'
    }});
    yield put({ type: CREATE_USER_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: CREATE_USER_FAIL, payload: error });
  }
}

function* deleteUser({payload}) {
  try {
    const id = payload;
    const response = yield call(doDelete, `user/${id}`)
    yield put({ type: DELETE_USER_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: DELETE_USER_FAIL, payload: error });
  }
}


export default function* userWatcher() {
  yield all([
    takeEvery(GET_USERS, getUsers),
    takeEvery(CREATE_USER, createUser),
    takeEvery(DELETE_USER, deleteUser)
  ]);
}
