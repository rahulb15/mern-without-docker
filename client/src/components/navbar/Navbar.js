import "./navbar.scss";
import React from "react";
// import { NavLink} from "react-router-dom";
import companyLogo from "../../images/companyLogo.png";
import { MdFingerprint } from "react-icons/md";


// navbar for admin
const AdminNavbar = () => {
  const RenderMenu = () => {

    async function logout(e) {
      e.preventDefault();
      console.log(localStorage.getItem("name"));
      console.log(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      // const name = localStorage.getItem("name");
      console.log(token);
      // console.log(name);
      const res = await fetch("http://localhost:5001/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {

        console.log("logout successful");
        localStorage.clear();
        window.location.href = "/login";
      }
      
    
    } 


    if (localStorage.getItem("token")) {
      return (
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav-inline navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >
                  <span>
                      <MdFingerprint size={30} spacing={10} />
                  </span>
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small" style={{fontSize:"20px"}}> {localStorage.getItem("name")} </span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" type="button">
                  Profile
                </button>
                <button class="dropdown-item" type="button">
                  Settings
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src={companyLogo} width="30" height="30" alt="companylogo"></img>
      </a>
      
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <RenderMenu />
    </nav>
  );
};

export default AdminNavbar;
