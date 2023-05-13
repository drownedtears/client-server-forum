import React from "react"
import "./Style.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../StyledComponents/Navbar/Navbar";
import Forum from "../StyledComponents/Forum/Forum"

const ForumPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <Forum></Forum> 
            </div>
        </>
    )
}
export default ForumPage
