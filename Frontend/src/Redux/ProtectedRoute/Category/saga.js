import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { category } from "./constant";
import { getCategoriesApi, createCategoryApi, updateCategoryApi, deleteCategoryApi } from "./api";

function* getCategoriesSagaFunction({ payload }) {
  try {
    yield put({
      type: category.GET_CATEGORIES_LOADING,
      payload: {},
    });
    const response = yield call(getCategoriesApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: category.GET_CATEGORIES_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: category.GET_CATEGORIES_FAILURE,
        payload: response.data || { message: 'Failed to get categories' },
      });
    }
  } catch (error) {
    yield put({
      type: category.GET_CATEGORIES_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* createCategorySagaFunction({ payload }) {
  try {
    yield put({
      type: category.CREATE_CATEGORY_LOADING,
      payload: {},
    });
    const response = yield call(createCategoryApi, payload || {});
    if (response.status == 201) {
      yield put({
        type: category.CREATE_CATEGORY_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: category.CREATE_CATEGORY_FAILURE,
        payload: response.data || { message: 'Failed to create category' },
      });
    }
  } catch (error) {
    yield put({
      type: category.CREATE_CATEGORY_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* updateCategorySagaFunction({ payload }) {
  try {
    yield put({
      type: category.UPDATE_CATEGORY_LOADING,
      payload: {},
    });
    const response = yield call(updateCategoryApi, payload || {});
    if (response.status == 200) {
      yield put({
        type: category.UPDATE_CATEGORY_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: category.UPDATE_CATEGORY_FAILURE,
        payload: response.data || { message: 'Failed to update category' },
      });
    }
  } catch (error) {
    yield put({
      type: category.UPDATE_CATEGORY_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

function* deleteCategorySagaFunction({ payload }) {
  try {
    yield put({
      type: category.DELETE_CATEGORY_LOADING,
      payload: {},
    });
    const response = yield call(deleteCategoryApi, payload);
    if (response.status == 200) {
      yield put({
        type: category.DELETE_CATEGORY_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: category.DELETE_CATEGORY_FAILURE,
        payload: response.data || { message: 'Failed to delete category' },
      });
    }
  } catch (error) {
    yield put({
      type: category.DELETE_CATEGORY_FAILURE,
      payload: error?.response?.data || error?.data || { message: 'Network error' },
    });
  }
}

export function* getCategoriesWatcher() {
  yield takeEvery(category.GET_CATEGORIES, getCategoriesSagaFunction);
}

export function* createCategoryWatcher() {
  yield takeEvery(category.CREATE_CATEGORY, createCategorySagaFunction);
}

export function* updateCategoryWatcher() {
  yield takeEvery(category.UPDATE_CATEGORY, updateCategorySagaFunction);
}

export function* deleteCategoryWatcher() {
  yield takeEvery(category.DELETE_CATEGORY, deleteCategorySagaFunction);
}

function* categorySaga() {
  yield all([fork(getCategoriesWatcher)]);
  yield all([fork(createCategoryWatcher)]);
  yield all([fork(updateCategoryWatcher)]);
  yield all([fork(deleteCategoryWatcher)]);
}

export default categorySaga;