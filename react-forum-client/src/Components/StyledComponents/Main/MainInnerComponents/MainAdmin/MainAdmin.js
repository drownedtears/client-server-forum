import React from "react"
import "./MainAdmin.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const MainAdmin = () => {
    
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
            <div class="buttons_block">
                <a class="btn btn-outline-secondary" href="/forum/user/main">Forum</a>
                <a class="btn btn-outline-secondary" href="/forum/admin/users">Users</a>
                <a class="btn btn-outline-secondary" href="/forum/admin/articles">Articles</a>
            </div>
        </>
    )
}
export default MainAdmin