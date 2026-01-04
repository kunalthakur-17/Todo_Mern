import { task } from "./constant";

export const getTasksAction = (data) => ({
  type: task.GET_TASKS,
  payload: data,
});

export const getTasksActionReset = (data) => ({
  type: task.GET_TASKS_RESET,
  payload: data,
});

export const createTaskAction = (data) => ({
  type: task.CREATE_TASK,
  payload: data,
});

export const createTaskActionReset = (data) => ({
  type: task.CREATE_TASK_RESET,
  payload: data,
});

export const updateTaskAction = (data) => ({
  type: task.UPDATE_TASK,
  payload: data,
});

export const updateTaskActionReset = (data) => ({
  type: task.UPDATE_TASK_RESET,
  payload: data,
});

export const deleteTaskAction = (data) => ({
  type: task.DELETE_TASK,
  payload: data,
});

export const deleteTaskActionReset = (data) => ({
  type: task.DELETE_TASK_RESET,
  payload: data,
});