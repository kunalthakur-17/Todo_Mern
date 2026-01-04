import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { task } from "./constant";
import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from "./api";

function* getTasksSagaFunction({ payload }) {
  try {
    yield put({
      type: task.GET_TASKS_LOADING,
      payload: {},
    });
    const response = yield call(getTasksApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: task.GET_TASKS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: task.GET_TASKS_FAILURE,
        payload: response.data || { message: 'Failed to get tasks' },
      });
    }
  } catch (error) {
    yield put({
      type: task.GET_TASKS_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* createTaskSagaFunction({ payload }) {
  try {
    yield put({
      type: task.CREATE_TASK_LOADING,
      payload: {},
    });
    const response = yield call(createTaskApi, payload || {});
    if (response.status == 201) {
      yield put({
        type: task.CREATE_TASK_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: task.CREATE_TASK_FAILURE,
        payload: response.data || { message: 'Failed to create task' },
      });
    }
  } catch (error) {
    yield put({
      type: task.CREATE_TASK_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* updateTaskSagaFunction({ payload }) {
  try {
    yield put({
      type: task.UPDATE_TASK_LOADING,
      payload: {},
    });
    const response = yield call(updateTaskApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: task.UPDATE_TASK_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: task.UPDATE_TASK_FAILURE,
        payload: response.data || { message: 'Failed to update task' },
      });
    }
  } catch (error) {
    yield put({
      type: task.UPDATE_TASK_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* deleteTaskSagaFunction({ payload }) {
  try {
    yield put({
      type: task.DELETE_TASK_LOADING,
      payload: {},
    });
    const response = yield call(deleteTaskApi, payload);
    if (response.status == 200) {
      yield put({
        type: task.DELETE_TASK_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: task.DELETE_TASK_FAILURE,
        payload: response.data || { message: 'Failed to delete task' },
      });
    }
  } catch (error) {
    yield put({
      type: task.DELETE_TASK_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

export function* getTasksWatcher() {
  yield takeEvery(task.GET_TASKS, getTasksSagaFunction);
}

export function* createTaskWatcher() {
  yield takeEvery(task.CREATE_TASK, createTaskSagaFunction);
}

export function* updateTaskWatcher() {
  yield takeEvery(task.UPDATE_TASK, updateTaskSagaFunction);
}

export function* deleteTaskWatcher() {
  yield takeEvery(task.DELETE_TASK, deleteTaskSagaFunction);
}

function* taskSaga() {
  yield all([fork(getTasksWatcher)]);
  yield all([fork(createTaskWatcher)]);
  yield all([fork(updateTaskWatcher)]);
  yield all([fork(deleteTaskWatcher)]);
}

export default taskSaga;