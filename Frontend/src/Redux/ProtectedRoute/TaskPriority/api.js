import { APICore } from "../../../helpers/api/apiCore";
import { getPriorities, createPriority, updatePriority, deletePriority, getPriorityById } from "../../../constants/endpoint";

const api = new APICore();

export const getPrioritiesApi = () => {
  return api.get(getPriorities);
};

export const createPriorityApi = (data) => {
  const { name } = data;
  return api.create(createPriority, { name });
};

export const updatePriorityApi = (data) => {
  const { id, name } = data;
  return api.update(`${updatePriority}/${id}`, { name });
};

export const deletePriorityApi = (id) => {
  return api.delete(`${deletePriority}/${id}`);
};

export const getPriorityByIdApi = (id) => {
  return api.get(`${getPriorityById}/${id}`);
};