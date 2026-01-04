import { category } from "./constant";

export const getCategoriesAction = (data) => ({
  type: category.GET_CATEGORIES,
  payload: data,
});

export const getCategoriesActionReset = (data) => ({
  type: category.GET_CATEGORIES_RESET,
  payload: data,
});

export const createCategoryAction = (data) => ({
  type: category.CREATE_CATEGORY,
  payload: data,
});

export const createCategoryActionReset = (data) => ({
  type: category.CREATE_CATEGORY_RESET,
  payload: data,
});

export const updateCategoryAction = (data) => ({
  type: category.UPDATE_CATEGORY,
  payload: data,
});

export const updateCategoryActionReset = (data) => ({
  type: category.UPDATE_CATEGORY_RESET,
  payload: data,
});

export const deleteCategoryAction = (data) => ({
  type: category.DELETE_CATEGORY,
  payload: data,
});

export const deleteCategoryActionReset = (data) => ({
  type: category.DELETE_CATEGORY_RESET,
  payload: data,
});