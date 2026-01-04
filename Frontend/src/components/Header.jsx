import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  BsPlusCircle,
  BsGear,
  BsQuestionCircle,
  BsClipboardCheck,
} from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";

const Header = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();

  const getPageTitle = (path) => {
    const pathMappings = {
      "/dashboard": {
        title: "Dashboard",
        icon: <LuLayoutDashboard />,
      },
      "/my-tasks": {
        title: "My Tasks",
        icon: <BsClipboardCheck />,
      },
      "/task-categories": {
        title: "Task Categories",
        icon: <BsPlusCircle />,
      },
      "/vitals-task": {
        title: "Vitals Task",
        icon: <MdOutlineInventory />,
      },
      "/settings": { title: "Settings", icon: <BsGear /> },
      "/help": {
        title: "Help",
        icon: <BsQuestionCircle />,
      },
    };

    return pathMappings[path] || { title: "Dashboard", icon: <LuLayoutDashboard /> };
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <Navbar bg="white" expand="lg" className="px-4 shadow-sm sticky-top">
      <div
        style={{
          fontFamily: "Nunito",
          fontSize: "20px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          className="btn ps-0 border-end rounded-0"
          style={{ border: "none" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <HiMenuAlt2 size={27} />
        </button>
        <span style={{ fontSize: "22px", color: "rgb(128, 0, 32)" }}>
          {pageTitle?.icon}
        </span>
        {pageTitle?.title}
      </div>
      <Nav className="ms-auto d-flex align-items-center gap-3">
    

        {/* Date Display */}
        <div className="text-end">
          <div className="fw-semibold" style={{ fontSize: "16px" }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Header;
