import { dashboard } from "./constant.js";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboard.GET_DASHBOARD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case dashboard.GET_DASHBOARD_SUCCESS:
      return {
        data: action?.payload,
        loading: false,
        error: null,
      };
    case dashboard.GET_DASHBOARD_RESET:
      return initialState;
    case dashboard.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};