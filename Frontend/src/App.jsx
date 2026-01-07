import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login/Login";
import SignUp from "./pages/auth/SignUp/SignUP";
import Dashboard from "./pages/protectedPage/Dashboard/Dashboard";
import MyTask from "./pages/protectedPage/MyTask/MyTask";
import TaskCategories from "./pages/protectedPage/TaskCategories/TaskCategories";
import TaskStatus from "./pages/protectedPage/TaskStatus/TaskStatus";
import TaskPriority from "./pages/protectedPage/TaskPriority/TaskPriority";
import Settings from "./pages/protectedPage/Settings/Settings";
import Help from "./pages/protectedPage/Help/Help";
import Layout from "./components/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/my-tasks" element={<Layout><MyTask /></Layout>} />
          <Route path="/task-categories" element={<Layout><TaskCategories /></Layout>} />
          <Route path="/task-status" element={<Layout><TaskStatus /></Layout>} />
          <Route path="/task-priority" element={<Layout><TaskPriority /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
