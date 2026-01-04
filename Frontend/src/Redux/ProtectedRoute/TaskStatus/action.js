import { taskStatus } from "./constant";

export const getStatusAction = (data) => ({
  type: taskStatus.GET_STATUS,
  payload: data,
});

export const getStatusActionReset = (data) => ({
  type: taskStatus.GET_STATUS_RESET,
  payload: data,
});

export const createStatusAction = (data) => ({
  type: taskStatus.CREATE_STATUS,
  payload: data,
});

export const createStatusActionReset = (data) => ({
  type: taskStatus.CREATE_STATUS_RESET,
  payload: data,
});

export const updateStatusAction = (data) => ({
  type: taskStatus.UPDATE_STATUS,
  payload: data,
});

export const updateStatusActionReset = (data) => ({
  type: taskStatus.UPDATE_STATUS_RESET,
  payload: data,
});

export const deleteStatusAction = (data) => ({
  type: taskStatus.DELETE_STATUS,
  payload: data,
});

export const deleteStatusActionReset = (data) => ({
  type: taskStatus.DELETE_STATUS_RESET,
  payload: data,
});



