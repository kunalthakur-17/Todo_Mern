import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/app_logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { LuSquareUser } from "react-icons/lu";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaTasks, FaFlag } from "react-icons/fa";


const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/login", { replace: true });
  };
  
  const menuItems = [
    {
      path: "/dashboard",
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
    },
      
    { path: "/my-tasks", icon: <BsClipboardCheck />, label: "My Tasks" },
    {
      path: "/task-categories",
      icon: <MdOutlineEmojiEvents />,
      label: "Task Categories",
    },
    {
      path: "/task-status",
      icon: <FaTasks />,
      label: "Task Status",
    },
    {
      path: "/task-priority",
      icon: <FaFlag />,
      label: "Task Priority",
    },
    {
      path: "/settings",
      icon: <LuSquareUser />,
      label: "Settings",
    },
    { path: "/help", icon: <MdMenuBook />, label: "Help" },
  ];

  return (
    <div
      className="d-flex flex-column text-white sidebar-sticky"
      style={{
        width: collapsed ? "80px" : "220px",
        minHeight: "100vh",
        transition: "width 0.3s ease",
        background: "linear-gradient(to bottom, #800020, rgb(159 35 25))",
        overflowX: "hidden",
      }}
    >
      {/* Logo & Toggle */}
      {/* <div className="p-3 text-center mb-3">
        <img
          src={logoImage}
          alt="Logo"
          style={{
            width: collapsed ? "45px" : "45px",
            transition: "0.3s",
          }}
        />
      </div> */}

      {/* User Profile Section */}
      {!collapsed && (
        <div className="p-3 mb-4 text-center">
          <img
            src="https://i.pravatar.cc/60"
            alt="User Avatar"
            className="rounded-circle mb-2"
            style={{ width: "60px", height: "60px" }}
          />
          <div className="text-white">
            <div className="fw-semibold" style={{ fontSize: "16px" }}>
              {(() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
              })()}
            </div>
            <div className="text-light" style={{ fontSize: "12px" }}>
              {(() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                return user.email || 'user@example.com';
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <Nav className="flex-column px-2 flex-grow-1">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            title={collapsed ? item.label : ""}
            className={`d-flex align-items-center mb-2 rounded ${
              location.pathname === item.path
                ? "bg-white text-dark"
                : "text-white"
            }`}
            style={{
              padding: "10px 12px",
              textDecoration: "none",
            }}
          >
            <span
              className="d-flex justify-content-center"
              style={{ width: "24px", fontSize: "18px", marginLeft: "7px" }}
            >
              {item.icon}
            </span>

            {!collapsed && (
              <span
                className="ms-3"
                style={{
                  fontSize: "14px",
                  fontFamily: "Nunito",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
            )}
          </Nav.Link>
        ))}
      </Nav>
      
      {/* Logout Button */}
      <div className="px-2 pb-3">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
          className="btn d-flex align-items-center w-100 text-white border-0"
          style={{
            padding: "10px 12px",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="d-flex justify-content-center"
            style={{ width: "24px", fontSize: "18px", marginLeft: "7px" }}
          >
            <BiLogOut />
          </span>
          {!collapsed && (
            <span
              className="ms-3"
              style={{
                fontSize: "14px",
                fontFamily: "Nunito",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
