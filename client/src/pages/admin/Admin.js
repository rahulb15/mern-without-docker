import React, { useEffect, useState} from "react";
import axios from "axios";
// import Sidebar from "../../components/sidebar/Sidebar";
import MiniDrawer from "../../components/miniSideBar/MiniSideBar";
import { Box } from "@mui/material";


//create table for admins and users and show in dashboard page as widget and show all admins and users in list page

const Admin = () => {
    const [admin, setAdmin] = useState([]);
    const [user, setUser] = useState([]);
    const [total, setTotal] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const[editAdmin, setEditAdmin] = useState({ name: "", password: "", userType: "" });
    const[editUser, setEditUser] = useState({ name: "",  password: "", userType: "" });
    const[deleteAdmin, setDeleteAdmin] = useState({ name: "", password: "", userType: "" });
    const[deleteUser, setDeleteUser] = useState({ name: "", password: "", userType: "" });

    useEffect(() => {
        axios.get("http://localhost:5001/api/admin/getAllAdmins") //get all admins
            .then((res) => {
                console.log(res.data.admins[0]  );
                res.data.admins.map((item) => {
                  
                    if(item.userType === "admin"){
                        setAdmin(res.data.admins.filter((item) => item.userType === "admin"));
                        setTotalAdmins(res.data.admins.filter((item) => item.userType === "admin").length);
                    }
                })

            
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

    useEffect(() => {
        setTotal(totalAdmins + totalUsers);
    }
    , [totalAdmins, totalUsers]);


    const handleEditAdmin = (id) => {
        axios.get(`http://localhost:5001/api/admin/getAdmin/${id}`)
            .then((res) => {
                setEditAdmin(res.data.admin);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleEditUser = (id) => {
        axios.get(`http://localhost:5001/api/user/getUser/${id}`)
            .then((res) => {
                setEditUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDeleteAdmin = (id) => {
        axios.delete(`http://localhost:5001/api/admin/delete/${id}`)
            .then((res) => {
                const filteredAdmin = [...admin];
                filteredAdmin.splice(filteredAdmin.indexOf(id), 1);
                setAdmin(filteredAdmin);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDeleteUser = (id) => {
        axios.get(`http://localhost:5001/api/user/getUser/${id}`)
            .then((res) => {
                setDeleteUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around', p: 5, m: 5, left: 0, top: 0, width: '20%', height: '100%', bgcolor: 'background.paper', }}>
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <MiniDrawer />
                </div>
                <div className="col-md-9">
                    <div className="adminTableTitleContainer">
                        <h1 className="adminTableTitle">Admins</h1>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr className="adminTableHeading">
                                <th className="adminTableHead">ID</th>
                                <th className="adminTableHead">Name</th>
                                <th className="adminTableHead">Contact</th>
                                <th className="adminTableHead">Status</th>
                                <th className="adminTableHead">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin.map((item) => (
                                <tr className="adminTableData">
                                    <td className="adminTableDataItem">{item._id}</td>
                                    <td className="adminTableDataItem">{item.name}</td>
                                    <td className="adminTableDataItem">{item.contact}</td>
                                    <td className="adminTableDataItem">{item.status}</td>
                                    <td className="adminTableDataItem">
                                        <button className="adminTableEdit" onClick={() => handleEditAdmin(item._id)} data-bs-toggle="modal" data-bs-target="#editAdminModal">Edit</button>
                                        <button className="adminTableDelete" onClick={() => handleDeleteAdmin(item._id)} data-bs-toggle="modal" data-bs-target="#deleteAdminModal">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="adminTableTitleContainer">
                        <h1 className="adminTableTitle">Users</h1>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr className="adminTableHeading">
                                <th className="adminTableHead">ID</th>
                                <th className="adminTableHead">Name</th>
                                <th className="adminTableHead">Status</th>
                                <th className="adminTableHead">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((item) => (
                                <tr className="adminTableData">
                                    {item.userType === "user" ? ( 
                                        <div>

                                    <td className="adminTableDataItem">{item._id}</td>
                                    <td className="adminTableDataItem">{item.name}</td>
                                    <td className="adminTableDataItem">{item.status}</td>
                                    <td className="adminTableDataItem">
                                        <button className="adminTableEdit" onClick={() => handleEditUser(item._id)} data-bs-toggle="modal" data-bs-target="#editUserModal">Edit</button>
                                        <button className="adminTableDelete" onClick={() => handleDeleteUser(item._id)} data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete</button>
                                    </td>
                                    </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="adminTableTitleContainer">
                        <h1 className="adminTableTitle">Total</h1>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr className="adminTableHeading">
                                <th className="adminTableHead">Total Admins</th>
                                <th className="adminTableHead">Total Users</th>
                                <th className="adminTableHead">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="adminTableData">
                                <td className="adminTableDataItem">{totalAdmins}</td>
                                <td className="adminTableDataItem">{totalUsers}</td>
                                <td className="adminTableDataItem">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </Box>
    );
};


export default Admin;