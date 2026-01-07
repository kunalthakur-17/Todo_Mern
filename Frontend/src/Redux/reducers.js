import { combineReducers } from "redux";
import { loginReducer, logoutReducer, signupReducer } from "./Auth/reducer";
import {
  getCategoriesReducer,
  createCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./ProtectedRoute/Category/reducer";
import {
  getStatusReducer,
  createStatusReducer,
  updateStatusReducer,
  deleteStatusReducer,
} from "./ProtectedRoute/TaskStatus/reducer";
import {
  getPrioritiesReducer,
  createPriorityReducer,
  updatePriorityReducer,
  deletePriorityReducer,
} from "./ProtectedRoute/TaskPriority/reducer";
import {
  getTasksReducer,
  createTaskReducer,
  updateTaskReducer,
  deleteTaskReducer,
} from "./ProtectedRoute/Task/reducer";
import { getDashboardReducer } from "./ProtectedRoute/Dashboard/reducer";

export default combineReducers({
  // auth
  loginReducer,
  logoutReducer,
  signupReducer,
  // Category

  getCategoriesReducer,
  createCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
  // Task Status
  getStatusReducer,
  createStatusReducer,
  updateStatusReducer,
  deleteStatusReducer,
  // Task Priority
  getPrioritiesReducer,
  createPriorityReducer,
  updatePriorityReducer,
  deletePriorityReducer,
  // Task
  getTasksReducer,
  createTaskReducer,
  updateTaskReducer,
  deleteTaskReducer,
  // Dashboard
  getDashboardReducer,
});
