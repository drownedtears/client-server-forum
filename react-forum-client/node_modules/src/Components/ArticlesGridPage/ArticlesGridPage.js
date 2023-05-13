import React from "react"
import "./Style.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../StyledComponents/Navbar/Navbar";
import ArticlesGrid from "../StyledComponents/ArticlesGrid/ArticlesGrid";

const ArticlesGridPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
              <ArticlesGrid></ArticlesGrid>
            </div>

        </>
    )
}
export default ArticlesGridPage
