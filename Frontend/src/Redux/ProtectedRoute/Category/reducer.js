import { category } from "./constant.js";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case category.GET_CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case category.GET_CATEGORIES_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case category.GET_CATEGORIES_RESET:
      return initialState;
    case category.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case category.CREATE_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case category.CREATE_CATEGORY_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case category.CREATE_CATEGORY_RESET:
      return initialState;
    case category.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case category.UPDATE_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case category.UPDATE_CATEGORY_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case category.UPDATE_CATEGORY_RESET:
      return initialState;
    case category.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case category.DELETE_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case category.DELETE_CATEGORY_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case category.DELETE_CATEGORY_RESET:
      return initialState;
    case category.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


