import React,{createContext, useReducer } from "react";
import { Route, Routes, } from 'react-router-dom';
import './App.css';
// import AdminNavbar from './components/navbar/Navbar';
import AdminLogin from './pages/login/Login';
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/admin/Admin";
import AdminTable from "./pages/admin/AdminTable";
import User from "./pages/user/User.js";
import {initialState, reducer} from './components/reducer/useReducer.js';
export const AdminContext = createContext();





const Routing = () => {
    var isLoggedIn = localStorage.getItem("token");
    var userType = localStorage.getItem("userType");

    return (
        <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/dashboard" element={isLoggedIn && userType === "superAdmin" ? <Dashboard /> : <AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminTable" element={isLoggedIn && userType === "superAdmin" ? <AdminTable /> : <AdminLogin />} />
            <Route path="/users" element={isLoggedIn && userType === "superAdmin" ? <User /> : <AdminLogin />} />
            <Route path="/login" element={isLoggedIn && userType === "superAdmin" ? <Dashboard /> : <AdminLogin />} />
            <Route path="*" element={isLoggedIn && userType === "superAdmin" ? <Dashboard /> : <AdminLogin />} />
        </Routes>
    );
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <AdminContext.Provider value={[ state, dispatch ]}>
            <Routing />
            </AdminContext.Provider>
        </div>
    );
}

export default App;