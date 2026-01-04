import { APICore } from "../../../helpers/api/apiCore";
import { getStatus, createStatus, updateStatus, deleteStatus, getStatusById } from "../../../constants/endpoint";

const api = new APICore();

export const getStatusApi = () => {
  return api.get(getStatus);
};

export const createStatusApi = (data) => {
  const { name } = data;
  return api.create(createStatus, { name });
};

export const updateStatusApi = (data) => {
  const { id, name } = data;
  return api.update(`${updateStatus}/${id}`, { name });
};

export const deleteStatusApi = (id) => {
  return api.delete(`${deleteStatus}/${id}`);
};

export const getStatusByIdApi = (id) => {
  return api.get(`${getStatusById}/${id}`);
};