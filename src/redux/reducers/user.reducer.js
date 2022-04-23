import { combineReducers } from 'redux';

const getUser = (state = { userData: null, userRefered: false }, action) => {
  switch (action.type) {

    case "GET_USER_LOADING":
      state = {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        userDetails: null,
        errors: null
      }
      break;
    case "GET_USER_SUCCESS":
      state = {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        userDetails: action.payload,
        errors: null
      }
      break;
    case "GET_USER_FAIL":
      state = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        userDetails: null,
        errors: action.payload
      }
      break;
    case "SET_USER_CURRENT_DATA":
      state = {
        ...state,
        userData: action.payload
      }
      break;
    case "CHECK_USER_REFFERRED_STATUS_SUCCESS":
      state = {
        ...state,
        userRefered: action.payload
      }
      break;
    case "UPDATED_CHECK_USER_REFFERRED_STATUS":
      state = {
        ...state,
        userRefered: action.payload
      }
      break;
    case "FETCHED_INITIAL_USER_DETIALS":
      state = {
        ...state,
        userData: action.payload
      }
      break;
    default:
      return state;
  }
  return state
}

export default combineReducers({
  getUser
});

