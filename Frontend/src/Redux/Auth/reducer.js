import { auth } from "./constant.js";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case auth.LOGIN_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case auth.LOGIN_RESET:
      return initialState;
    case auth.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGOUT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case auth.LOGOUT_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case auth.LOGOUT_RESET:
      return initialState;
    case auth.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case auth.SIGNUP_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case auth.SIGNUP_RESET:
      return initialState;
    case auth.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


