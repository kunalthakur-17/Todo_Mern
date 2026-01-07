import { APICore } from "../../../helpers/api/apiCore";
import { getDashboard } from "../../../constants/endpoint";

const apiCore = new APICore();

export const getDashboardApi = async (data) => {
  try {
    const response = await apiCore.get(getDashboard, data);
    return response;
  } catch (error) {
    throw error;
  }
};