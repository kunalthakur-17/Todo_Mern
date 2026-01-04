import { auth } from "./constant";

export const loginAction = (data) => ({
  type: auth.LOGIN,
  payload: data,
});

export const loginActionReset = (data) => ({
  type: auth.LOGIN_RESET,
  payload: data,
});

export const logoutAction = (data) => ({
  type: auth.LOGOUT,
  payload: data,
});

export const logoutActionReset = (data) => ({
  type: auth.LOGOUT_RESET,
  payload: data,
});

export const signupAction = (data) => ({
  type: auth.SIGNUP,
  payload: data,
});

export const signupActionReset = (data) => ({
  type: auth.SIGNUP_RESET,
  payload: data,
});