import React from "react"
import "./Style.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../StyledComponents/Navbar/Navbar";
import CreateArticle from "../StyledComponents/CreateArticle/CreateArticle"

const ForumPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <CreateArticle></CreateArticle> 
            </div>
        </>
    )
}
export default ForumPage
