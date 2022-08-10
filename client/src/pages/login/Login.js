import React from "react";
import axios from "axios";
import "./login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import AdminImg from "../../images/AdminImg.jpg"
import images from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import FormDialog from '../../UI/CreateSuperAdminDialogue';


function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
}


const AdminLogin = () => {
   //page pathname is /login
   console.log(window.location.pathname);
    
    const [admin , setAdmin] = React.useState({
        name : "",
        password : ""
    });
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setAdmin((prevValue) => {
            return {
                ...prevValue,
                [name] : value
            }
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(admin);
        if(admin.name || admin.password){
            if(validatePassword(admin.password)){
                axios.post("http://localhost:5001/api/admin/login", admin)
                .then((res) => {
                    console.log(res);
                    if(res.status === 200 ){
                      console.log(res.data.token);
                      console.log(res.data.userType);
                      //super admin
                      if(res.data.userType === "superAdmin"){
                        console.log("super admin");
                        console.log(res.data.token);
                         localStorage.setItem("token", res.data.token);
                         localStorage.setItem("name", res.data.name);
                         localStorage.setItem("userType", res.data.userType);
                        alert("Login Successful");
                        window.location.href = "/dashboard";
                      }
                      //admin
                      else if(res.data.userType === "admin"){
                        localStorage.setItem("token", res.data.token);
                         localStorage.setItem("name", res.data.name);
                         localStorage.setItem("userType", res.data.userType);
                        alert("Login Successful");
                        window.location.href = "/dashboard";
                      }
                      //user
                      // else if(res.data.userType === "user"){
                      //   localStorage.setItem("token", res.data.token);
                      //   localStorage.setItem("name", res.data.name);
                      //   localStorage.setItem("userType", res.data.userType);

                      //   alert("Login Successful");
                      //   window.location.href = "/user";
                      // }
                        // localStorage.setItem("token", res.data.token);
                        // alert("Login Successful");
                        // window.location.pathname = "/dashboard";
                    }else{
                        alert("Login Failed");
                    }
                })
                .catch((err) => {
                  console.log("Ohh no");
                    console.log(err);
                });
            }else{
                alert("Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter");
            }
        }else{
            alert("Please fill all the fields");
        }
    }
    
    return (
        <div class="overflow-hidden">
      <section className="login">
        <FormDialog />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="login-content">
                <div className="login-form">
                  <h1 className="form-title">Login</h1>
                  <p className="form-description">
                    Please fill in this form to login.
                  </p>

                  <form className="login-form" id="login-form" method="POST">
                    <div className="form-group">
                      <label className="control-label">Name</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="name"
                          placeholder="Name"
                          name="name"
                          value={admin.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* <p className="emailError">{user.emailError}</p> */}
                      <label className="control-label">Password</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={admin.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p className="passwordError"></p>
                      {/* <p className="passwordError">{user.passwordError}</p> */}
                      {/* <p className="loginError">{user.error}</p> */}
                      <button className="login-button btn-primary btn-lg btn-block"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="login-image col-md-8" align="center">
              <figure>
                <img
                  src={AdminImg}
                  alt="singup"
                  width="410"
                  height="410"
                  class="rounded-circle"
                  // border-radius="50%"
                />
                <p> </p>
                <img src={image2} alt="singup" width="200" height="200" class = "rounded-circle float-left" />
                <p> </p>
                <img src={images} alt="singup" width="150" height="150" class = "rounded-circle float-right" />

              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>




        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <input type="name" name="name" value={admin.name} onChange={handleChange} placeholder="Name" />
        //         <input type="password" name="password" value={admin.password} onChange={handleChange} placeholder="Password" />
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
    );
}

export default AdminLogin;