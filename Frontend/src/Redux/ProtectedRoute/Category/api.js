import { APICore } from "../../../helpers/api/apiCore";
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from "../../../constants/endpoint";

const api = new APICore();

export const getCategoriesApi = () => {
  return api.get(getCategories);
};

export const createCategoryApi = (data) => {
  const { name, userId } = data;
  return api.create(createCategory, { name, userId });
};

export const updateCategoryApi = (data) => {
  const { id, name } = data;
  return api.update(`${updateCategory}/${id}`, { name });
};

export const deleteCategoryApi = (data) => {
  const { id } = data;
  return api.delete(`${deleteCategory}/${id}`);
};

export const getCategoryByIdApi = (id) => {
  return api.get(`${getCategoryById}/${id}`);
};