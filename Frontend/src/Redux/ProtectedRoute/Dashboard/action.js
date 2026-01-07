import { dashboard } from "./constant";

export const getDashboardAction = (data) => ({
  type: dashboard.GET_DASHBOARD,
  payload: data,
});

export const getDashboardActionReset = (data) => ({
  type: dashboard.GET_DASHBOARD_RESET,
  payload: data,
});