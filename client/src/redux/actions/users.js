export const GET_USERS = 'GET_USERS'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAIL = 'GET_USERS_FAIL'
export const RESET_USERS = 'RESET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL'
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';


export const getUsers = (payload) => ({
  type: GET_USERS,
  payload
})

export const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  paylaod: data
})

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error
})

export const createUser = (payload) => ({
  type: CREATE_USER,
  payload
})

export const createUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  payload: data
})
export const createUserFail = (error) => ({
  type: CREATE_USER_FAIL,
  payload: error
})

export const deleteUser = (payload) => ({
  type: DELETE_USER,
  payload
})

export const deleteUserSuccess = (data) => ({
  type: DELETE_USER_SUCCESS,
  payload: data
})

export const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  paylaod: error
})

export const resetUsers = (payload) => ({
  type: RESET_USERS,
  payload
})