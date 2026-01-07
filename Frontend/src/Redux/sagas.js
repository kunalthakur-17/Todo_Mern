import { all } from "redux-saga/effects";
import authSaga from "./Auth/saga";
import categorySaga from "./ProtectedRoute/Category/saga";
import taskPrioritySaga from "./ProtectedRoute/TaskPriority/saga";
import taskStatusSaga from "./ProtectedRoute/TaskStatus/saga";
import taskSaga from "./ProtectedRoute/Task/saga";
import dashboardSaga from "./ProtectedRoute/Dashboard/saga";


export default function* rootSaga() {
  yield all([

    authSaga(),
    categorySaga(),
    taskPrioritySaga(),
    taskStatusSaga(),
    taskSaga(),
    dashboardSaga()
   
  ]);
}
