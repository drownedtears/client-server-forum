import React from "react"
import "./LoginFormStyle.css"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const LoginForm = () => {
    return (
        <>
            <div className="main-form">
                    <h1 className="display-4">Login</h1>
                    <form id="f" className="f" name="f" method="post" action="http://localhost:5555/forum/login">
                        <div className="row mb-3">
                            <label for="username" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input className="field form-control" type="text" id="username" name="username" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input className="field form-control" type="password" id="password" name="password" />
                            </div>
                        </div>
                        <div className="form-actions">
                            <a className="btn btn-outline-secondary" href="/">Back</a>
                            <button type="submit" className="btn btn-outline-success">Sign in</button>
                        </div>
                    </form>
                </div>
        </>
    )
}
export default LoginForm