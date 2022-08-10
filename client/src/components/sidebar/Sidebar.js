import React from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
// import { useContext } from "react";

const Sidebar = () => {
  return (
    <div className="sidebar position-static p-2 bd-highlight text-center">
      {/* <div className="top">
          <span className="logo">Admin</span>
      </div> */}
      {/* <hr /> */}
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <span>Admins</span>
            </li>
          </NavLink>
          <NavLink to="/list" style={{ textDecoration: "none" }}>
            <li>
              <span>Users</span>
            </li>
          </NavLink>
         
          {/* <p className="title">USEFUL</p>
          <li>
            <span>Stats</span>
          </li>
          <li>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <span>System Health</span>
          </li>
          <li>
            <span>Logs</span>
          </li>
          <li>
            <span>Settings</span>
          </li> */}
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;