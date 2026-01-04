import { task } from "./constant.js";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case task.GET_TASKS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case task.GET_TASKS_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case task.GET_TASKS_RESET:
      return initialState;
    case task.GET_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case task.CREATE_TASK_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case task.CREATE_TASK_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case task.CREATE_TASK_RESET:
      return initialState;
    case task.CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case task.UPDATE_TASK_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case task.UPDATE_TASK_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case task.UPDATE_TASK_RESET:
      return initialState;
    case task.UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case task.DELETE_TASK_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case task.DELETE_TASK_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case task.DELETE_TASK_RESET:
      return initialState;
    case task.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};