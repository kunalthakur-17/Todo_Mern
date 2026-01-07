import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { auth } from "./constant";
import { loginApi, logoutApi, signupApi } from "./api";
import { setAuthorization } from "../../helpers/api/apiCore";

function* loginSagaFunction({ payload }) {
  try {
    yield put({
      type: auth.LOGIN_LOADING,
      payload: {},
    });
    const response = yield call(loginApi, payload || {});
    if (response.status == 200) {
      // Store token and user data in localStorage
      localStorage.setItem('token', response.data.response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.response.userId,
        firstName: response.data.response.firstName,
        lastName: response.data.response.lastName,
        email: response.data.response.email,
        username: response.data.response.username
      }));
      
      // Set authorization header with new token
      setAuthorization(response.data.response.token);
      
      yield put({
        type: auth.LOGIN_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: auth.LOGIN_FAILURE,
        payload: response.data || { message: 'Login failed' },
      });
    }
  } catch (error) {
    yield put({
      type: auth.LOGIN_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* logoutSagaFunction({ payload }) {
  try {
    yield put({
      type: auth.LOGOUT_LOADING,
      payload: {},
    });
    const response = yield call(logoutApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: auth.LOGOUT_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: auth.LOGOUT_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: auth.LOGOUT_FAILURE,
      payload: error?.data,
    });
  }
}

function* signupSagaFunction({ payload }) {
  try {
    yield put({
      type: auth.SIGNUP_LOADING,
      payload: {},
    });
    const response = yield call(signupApi, payload || {});
    if (response.status == 201) {
      // Store token and user data in localStorage
      localStorage.setItem('token', response.data.response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.response.userId,
        firstName: response.data.response.firstName,
        lastName: response.data.response.lastName,
        email: response.data.response.email,
        username: response.data.response.username
      }));
      
      // Set authorization header with new token
      setAuthorization(response.data.response.token);
      
      yield put({
        type: auth.SIGNUP_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: auth.SIGNUP_FAILURE,
        payload: response.data || { message: 'Signup failed' },
      });
    }
  } catch (error) {
    yield put({
      type: auth.SIGNUP_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

export function* loginWatcher() {
  yield takeEvery(auth.LOGIN, loginSagaFunction);
}

export function* logoutWatcher() {
  yield takeEvery(auth.LOGOUT, logoutSagaFunction);
}

export function* signupWatcher() {
  yield takeEvery(auth.SIGNUP, signupSagaFunction);
}

function* authSaga() {
  yield all([fork(loginWatcher)]);
  yield all([fork(logoutWatcher)]);
  yield all([fork(signupWatcher)]);
}

export default authSaga;