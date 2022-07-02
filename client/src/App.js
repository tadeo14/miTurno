import React from "react";
import { Route, Routes } from "react-router-dom";

import General from "./views/General";
import Register from "./views/Register";
import Login from "./views/Login";
import AssistPassword from "./views/AssistPassword";
import RestorePassword from "./views/RestorePassword";
import Users from "./views/Users";
import MyAccount from "./views/MyAccount";

import style from "./styles/App.module.css";

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/layout" element={<General />} />
        <Route path="/users" element={<Users />} />
<<<<<<< HEAD
        <Route path="/login" element={<Login />}/>
        <Route path="/assist_password" element={<AssistPassword />}/>
        <Route path="/restore_password" element={<RestorePassword />}/>
=======
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/assist_password" element={<AssistPassword />} />
        <Route path="/restore_password" element={<RestorePassword />} />
>>>>>>> 2a176d9c4ee414125aebdeab7945d3ce367c7a24
        {/* 
        <Route path="/welcome" element={<Welcome />}/>
        <Route path="/branch_offices" element={<BranchOffices />}/>
 */}
      </Routes>
    </div>
  );
}

export default App;
