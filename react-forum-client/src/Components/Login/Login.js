import React from "react"
import "./Style.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../StyledComponents/Navbar/Navbar";
import LoginForm from "../StyledComponents/LoginForm/LoginForm";

const Login = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
               <LoginForm></LoginForm>
            </div>

        </>
    )
}
export default Login
