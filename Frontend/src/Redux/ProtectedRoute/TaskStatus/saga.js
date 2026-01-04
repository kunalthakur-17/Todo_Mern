import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { taskStatus } from "./constant";
import { getStatusApi, createStatusApi, updateStatusApi, deleteStatusApi } from "./api";

function* getStatusSagaFunction({ payload }) {
  try {
    yield put({
      type: taskStatus.GET_STATUS_LOADING,
      payload: {},
    });
    const response = yield call(getStatusApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: taskStatus.GET_STATUS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskStatus.GET_STATUS_FAILURE,
        payload: response.data || { message: 'Failed to get status' },
      });
    }
  } catch (error) {
    yield put({
      type: taskStatus.GET_STATUS_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* createStatusSagaFunction({ payload }) {
  try {
    yield put({
      type: taskStatus.CREATE_STATUS_LOADING,
      payload: {},
    });
    const response = yield call(createStatusApi, payload || {});
    if (response.status == 201) {
      yield put({
        type: taskStatus.CREATE_STATUS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskStatus.CREATE_STATUS_FAILURE,
        payload: response.data || { message: 'Failed to create status' },
      });
    }
  } catch (error) {
    yield put({
      type: taskStatus.CREATE_STATUS_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* updateStatusSagaFunction({ payload }) {
  try {
    yield put({
      type: taskStatus.UPDATE_STATUS_LOADING,
      payload: {},
    });
    const response = yield call(updateStatusApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: taskStatus.UPDATE_STATUS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskStatus.UPDATE_STATUS_FAILURE,
        payload: response.data || { message: 'Failed to update status' },
      });
    }
  } catch (error) {
    yield put({
      type: taskStatus.UPDATE_STATUS_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* deleteStatusSagaFunction({ payload }) {
  try {
    yield put({
      type: taskStatus.DELETE_STATUS_LOADING,
      payload: {},
    });
    const response = yield call(deleteStatusApi, payload);
    if (response.status == 200) {
      yield put({
        type: taskStatus.DELETE_STATUS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskStatus.DELETE_STATUS_FAILURE,
        payload: response.data || { message: 'Failed to delete status' },
      });
    }
  } catch (error) {
    yield put({
      type: taskStatus.DELETE_STATUS_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

export function* getStatusWatcher() {
  yield takeEvery(taskStatus.GET_STATUS, getStatusSagaFunction);
}

export function* createStatusWatcher() {
  yield takeEvery(taskStatus.CREATE_STATUS, createStatusSagaFunction);
}

export function* updateStatusWatcher() {
  yield takeEvery(taskStatus.UPDATE_STATUS, updateStatusSagaFunction);
}

export function* deleteStatusWatcher() {
  yield takeEvery(taskStatus.DELETE_STATUS, deleteStatusSagaFunction);
}

function* taskStatusSaga() {
  yield all([fork(getStatusWatcher)]);
  yield all([fork(createStatusWatcher)]);
  yield all([fork(updateStatusWatcher)]);
  yield all([fork(deleteStatusWatcher)]);
}

export default taskStatusSaga;