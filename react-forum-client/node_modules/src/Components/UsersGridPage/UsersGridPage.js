import React from "react"
import "./Style.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../StyledComponents/Navbar/Navbar";
import UsersGrid from "../StyledComponents/UsersGrid/UsersGrid";

const UsersGridPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
              <UsersGrid></UsersGrid>
            </div>

        </>
    )
}
export default UsersGridPage
