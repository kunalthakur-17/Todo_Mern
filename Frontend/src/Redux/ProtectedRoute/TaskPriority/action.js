import { taskPriority } from "./constant";

export const getPrioritiesAction = (data) => ({
  type: taskPriority.GET_PRIORITIES,
  payload: data,
});

export const getPrioritiesActionReset = (data) => ({
  type: taskPriority.GET_PRIORITIES_RESET,
  payload: data,
});

export const createPriorityAction = (data) => ({
  type: taskPriority.CREATE_PRIORITY,
  payload: data,
});

export const createPriorityActionReset = (data) => ({
  type: taskPriority.CREATE_PRIORITY_RESET,
  payload: data,
});

export const updatePriorityAction = (data) => ({
  type: taskPriority.UPDATE_PRIORITY,
  payload: data,
});

export const updatePriorityActionReset = (data) => ({
  type: taskPriority.UPDATE_PRIORITY_RESET,
  payload: data,
});

export const deletePriorityAction = (data) => ({
  type: taskPriority.DELETE_PRIORITY,
  payload: data,
});

export const deletePriorityActionReset = (data) => ({
  type: taskPriority.DELETE_PRIORITY_RESET,
  payload: data,
});

