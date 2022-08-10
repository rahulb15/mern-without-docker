import React, { useEffect, useState,useContext} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
// import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import MiniDrawer from "../../components/miniSideBar/MiniSideBar";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const Dashboard = () => {
    const [admin, setAdmin] = useState([]);
    const [user, setUser] = useState([]);
    // const [total, setTotal] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");  //get token from local storage
        if (!token) {
            navigate("/login");
        }
    }
    , []);

    useEffect(() => {
        axios.get("http://localhost:5001/api/admin/getAllAdmins") //get all admMiniDrawerins
            .then((res) => {
                //if super admin is logged in then show all admins
                console.log(res.data.admins[0]  );
                res.data.admins.map((item) => {
                    // if(item.userType === "superAdmin"){
                    //     setAdmin(res.data.admins);
                    // }
                    //if admin is logged in then show only admins
                    if(item.userType === "admin"){
                        setAdmin(res.data.admins.filter((item) => item.userType === "admin"));
                        setTotalAdmins(res.data.admins.filter((item) => item.userType === "admin").length);
                    }
                })

                // console.log(res.data.admins);
                // setAdmin(res.data.admins);
                // setTotalAdmins(res.data.admins.length);
                // console.log(res.data.admins);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }
    , []);

    useEffect(() => {
      axios.get("http://localhost:5001/api/user/getAllUsers") //get all users
          .then((res) => {
              setUser(res.data.users);
              setTotalUsers(res.data.users.length);
          })
          .catch((err) => {
              console.log(err);
          })
  }
  , []);

    return (
      <div style={{backgroundColor: "#fce4ec" , height: "100vh"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around', p: 10, m: 10 }}>
        <div class="d-flex flex-row bd-highlight mb-3">
          {/* <Sidebar /> */}
            <MiniDrawer />
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={10}>
          <Grid item>
            <Paper sx={{ height: 182, width: 300, backgroundColor: '#f8bbd0',borderRadius: '20px' }}>
            <Widget type="admin" totalAdmins={totalAdmins} totalUsers={totalUsers}  admins={admin} />            
            </Paper>
            </Grid>
          <Grid item>
          <Paper sx={{ height: 182, width: 300, backgroundColor: '#9fa8da',borderRadius: '20px' }}>
            <Widget type="user" totalAdmins={totalAdmins} totalUsers={totalUsers} users={user} />
            </Paper>
            </Grid>

        </Grid>
      </Grid>
      <Grid item xs={12}>
  
      </Grid>
    </Grid>
        </div>
        </Box>
      </div>
      );
};

export default Dashboard;
