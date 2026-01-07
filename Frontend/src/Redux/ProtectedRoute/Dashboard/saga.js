import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { dashboard } from "./constant";
import { getDashboardApi } from "./api";

function* getDashboardSagaFunction({ payload }) {
  try {
    yield put({
      type: dashboard.GET_DASHBOARD_LOADING,
      payload: {},
    });
    const response = yield call(getDashboardApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: dashboard.GET_DASHBOARD_SUCCESS,
        payload: response.data.response,
      });
    } else {
      yield put({
        type: dashboard.GET_DASHBOARD_FAILURE,
        payload: response.data || { message: 'Failed to get dashboard data' },
      });
    }
  } catch (error) {
    yield put({
      type: dashboard.GET_DASHBOARD_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

export function* getDashboardWatcher() {
  yield takeEvery(dashboard.GET_DASHBOARD, getDashboardSagaFunction);
}

function* dashboardSaga() {
  yield all([fork(getDashboardWatcher)]);
}

export default dashboardSaga;