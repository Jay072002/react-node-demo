import {GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL, RESET_USERS, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL, DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from "../actions/users"

const initialState = {
  users: {
    data: [],
    loading: false,
    error: null,
    success: false
  }
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          success: false,
          error: null
        }
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: action.payload,
          loading: false,
          success: true,
          error: null
        }
      }
    case GET_USERS_FAIL:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          success: false,
          error: action.payload
        }
      }
    case CREATE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          success: false,
          error: null
        }
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: [...state.users.data, action.payload],
          loading: false,
          success: true,
          error: null
        }
      }
    case CREATE_USER_FAIL:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          success: false,
          error: action.payload
        }
      }
    case DELETE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          success: false,
          error: null
        }
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: state?.users?.data?.filter(user => user._id !== action?.payload),
          loadig: false,
          success: true,
          error: null
        }
      }
    case DELETE_USER_FAIL:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          success: false,
          error: action.payload
        }
      }
    case RESET_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          success: false,
          error: null
        }
      }
    default:
      return state;
  }
}

export default userReducer;