import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { taskPriority } from "./constant";
import { getPrioritiesApi, createPriorityApi, updatePriorityApi, deletePriorityApi } from "./api";

function* getPrioritiesSagaFunction({ payload }) {
  try {
    yield put({
      type: taskPriority.GET_PRIORITIES_LOADING,
      payload: {},
    });
    const response = yield call(getPrioritiesApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: taskPriority.GET_PRIORITIES_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskPriority.GET_PRIORITIES_FAILURE,
        payload: response.data || { message: 'Failed to get priorities' },
      });
    }
  } catch (error) {
    yield put({
      type: taskPriority.GET_PRIORITIES_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* createPrioritySagaFunction({ payload }) {
  try {
    yield put({
      type: taskPriority.CREATE_PRIORITY_LOADING,
      payload: {},
    });
    const response = yield call(createPriorityApi, payload || {});
    if (response.status == 201) {
      yield put({
        type: taskPriority.CREATE_PRIORITY_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskPriority.CREATE_PRIORITY_FAILURE,
        payload: response.data || { message: 'Failed to create priority' },
      });
    }
  } catch (error) {
    yield put({
      type: taskPriority.CREATE_PRIORITY_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* updatePrioritySagaFunction({ payload }) {
  try {
    yield put({
      type: taskPriority.UPDATE_PRIORITY_LOADING,
      payload: {},
    });
    const response = yield call(updatePriorityApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: taskPriority.UPDATE_PRIORITY_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskPriority.UPDATE_PRIORITY_FAILURE,
        payload: response.data || { message: 'Failed to update priority' },
      });
    }
  } catch (error) {
    yield put({
      type: taskPriority.UPDATE_PRIORITY_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* deletePrioritySagaFunction({ payload }) {
  try {
    yield put({
      type: taskPriority.DELETE_PRIORITY_LOADING,
      payload: {},
    });
    const response = yield call(deletePriorityApi, payload);
    if (response.status == 200) {
      yield put({
        type: taskPriority.DELETE_PRIORITY_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: taskPriority.DELETE_PRIORITY_FAILURE,
        payload: response.data || { message: 'Failed to delete priority' },
      });
    }
  } catch (error) {
    yield put({
      type: taskPriority.DELETE_PRIORITY_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

export function* getPrioritiesWatcher() {
  yield takeEvery(taskPriority.GET_PRIORITIES, getPrioritiesSagaFunction);
}

export function* createPriorityWatcher() {
  yield takeEvery(taskPriority.CREATE_PRIORITY, createPrioritySagaFunction);
}

export function* updatePriorityWatcher() {
  yield takeEvery(taskPriority.UPDATE_PRIORITY, updatePrioritySagaFunction);
}

export function* deletePriorityWatcher() {
  yield takeEvery(taskPriority.DELETE_PRIORITY, deletePrioritySagaFunction);
}

function* taskPrioritySaga() {
  yield all([fork(getPrioritiesWatcher)]);
  yield all([fork(createPriorityWatcher)]);
  yield all([fork(updatePriorityWatcher)]);
  yield all([fork(deletePriorityWatcher)]);
}

export default taskPrioritySaga;