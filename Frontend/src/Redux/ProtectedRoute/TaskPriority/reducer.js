import { taskPriority } from "./constant.js";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getPrioritiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskPriority.GET_PRIORITIES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskPriority.GET_PRIORITIES_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskPriority.GET_PRIORITIES_RESET:
      return initialState;
    case taskPriority.GET_PRIORITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskPriority.CREATE_PRIORITY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskPriority.CREATE_PRIORITY_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskPriority.CREATE_PRIORITY_RESET:
      return initialState;
    case taskPriority.CREATE_PRIORITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskPriority.UPDATE_PRIORITY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskPriority.UPDATE_PRIORITY_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskPriority.UPDATE_PRIORITY_RESET:
      return initialState;
    case taskPriority.UPDATE_PRIORITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deletePriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskPriority.DELETE_PRIORITY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskPriority.DELETE_PRIORITY_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskPriority.DELETE_PRIORITY_RESET:
      return initialState;
    case taskPriority.DELETE_PRIORITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


