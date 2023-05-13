import React from "react"
import "./Style.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../StyledComponents/Navbar/Navbar";
import RegistrationForm from "../StyledComponents/RegistrationForm/RegistrationForm";

const Login = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
               <RegistrationForm></RegistrationForm>
            </div>

        </>
    )
}
export default Login
