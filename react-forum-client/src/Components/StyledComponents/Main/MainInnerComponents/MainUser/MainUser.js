import React from "react"
import "./MainUser.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const MainUser = () => {
    
    return (
        <>
            <figure>
                <blockquote class="blockquote">
                    <p>A fool with a tool is still a fool. Always have a goal, a plan & the tool as the enabler.</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    <cite title="Source Title">Darshan Appayanna</cite>
                </figcaption>
            </figure>
            <div class="main_inner">
                <div class="buttons_block">
                    <a class="btn btn-outline-secondary" href="/forum/user/main">Take me to the forum</a>
                </div>
            </div>
        </>
    )
}
export default MainUser