const baseurl = "/api/v1";

// auth Endpoints
export const login = `${baseurl}/user/login`;
export const logout = `${baseurl}/user/logout`;
export const signup = `${baseurl}/user/register`;


//  Category 
export const getCategories = `${baseurl}/category`;
export const createCategory = `${baseurl}/category`;
export const updateCategory = `${baseurl}/category`;
export const deleteCategory = `${baseurl}/category`;
export const getCategoryById = `${baseurl}/category`;

// Task Status
export const getStatus = `${baseurl}/taskstatus`;
export const createStatus = `${baseurl}/taskstatus`;
export const updateStatus = `${baseurl}/taskstatus`;
export const deleteStatus = `${baseurl}/taskstatus`;
export const getStatusById = `${baseurl}/taskstatus`;

// Task Priority
export const getPriorities = `${baseurl}/taskpriority`;
export const createPriority = `${baseurl}/taskpriority`;
export const updatePriority = `${baseurl}/taskpriority`;
export const deletePriority = `${baseurl}/taskpriority`;
export const getPriorityById = `${baseurl}/taskpriority`;

// Task
export const getTasks = `${baseurl}/task`;
export const createTask = `${baseurl}/task`;
export const updateTask = (id) => `${baseurl}/task/${id}`;
export const deleteTask = (id) => `${baseurl}/task/${id}`;
export const getTaskById = (id) => `${baseurl}/task/${id}`;

// Dashboard
export const getDashboard = `${baseurl}/dashboard`;
