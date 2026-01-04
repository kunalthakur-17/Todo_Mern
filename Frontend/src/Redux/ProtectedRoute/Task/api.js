import { APICore } from "../../../helpers/api/apiCore";
import { getTasks, createTask, updateTask, deleteTask, getTaskById } from "../../../constants/endpoint";

const api = new APICore();

export const getTasksApi = () => {
  return api.get(getTasks);
};

export const createTaskApi = (data) => {
  return api.create(createTask, data);
};

export const updateTaskApi = (data) => {
  const { id, ...taskData } = data;
  return api.update(`${updateTask}/${id}`, taskData);
};

export const deleteTaskApi = (id) => {
  return api.delete(`${deleteTask}/${id}`);
};

export const getTaskByIdApi = (id) => {
  return api.get(`${getTaskById}/${id}`);
};