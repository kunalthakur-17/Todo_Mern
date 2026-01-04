import { taskStatus } from "./constant.js";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskStatus.GET_STATUS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskStatus.GET_STATUS_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskStatus.GET_STATUS_RESET:
      return initialState;
    case taskStatus.GET_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskStatus.CREATE_STATUS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskStatus.CREATE_STATUS_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskStatus.CREATE_STATUS_RESET:
      return initialState;
    case taskStatus.CREATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskStatus.UPDATE_STATUS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskStatus.UPDATE_STATUS_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskStatus.UPDATE_STATUS_RESET:
      return initialState;
    case taskStatus.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskStatus.DELETE_STATUS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case taskStatus.DELETE_STATUS_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case taskStatus.DELETE_STATUS_RESET:
      return initialState;
    case taskStatus.DELETE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


