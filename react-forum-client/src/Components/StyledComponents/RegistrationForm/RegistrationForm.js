import React from "react"
import "./RegistrationFormStyle.css"
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

async function onSubmit() {
    var name = document.getElementById("inputUsername3").value;
    var pass = document.getElementById("inputPassword3").value;
    var passConfirm = document.getElementById("inputPassword4").value;

    if (name.length < 4) {
        document.getElementById("usernameError").textContent = "Username must have at least 4 symbols length";
        return;
    }
    if (pass.length < 4) {
        document.getElementById("passwordError").textContent = "Username must have at least 4 symbols length";
        return;
    } 
    else if (pass !== passConfirm) {
        document.getElementById("passwordConfirmError").textContent = "Password mismatch";
        return;
    }

    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }

    const bodyData = {
        'username': name,
        'password': pass,
        'passwordConfirm': passConfirm
    }
    try {
        const response = await axios.post('http://localhost:5555/forum/registration', bodyData, configHeaders);
        console.log(response.data);
        if (response.data.status === true) {
            window.location.replace("http://localhost:3000");
        } else {
            document.getElementById("usernameError").textContent = "User already exists";
        }
    } catch (error) {
        console.error(error);
    }
}

const RegistrationForm = () => {
    return (
        <>
            <div class="main-form">
                <h1 class="display-4">Registration</h1>
                <form class="userForm" method="post">
                    <div class="row mb-3">
                        <label for="inputUsername3" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputUsername3"/>
                            <label for="inputUsername3" class="col-sm-10 col-form-label error" id="usernameError"></label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword3"/>
                            <label for="inputPassword3" class="col-sm-10 col-form-label error" id="passwordError"></label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword4" class="col-sm-2 col-form-label">Confirm</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword4"/>
                            <label for="inputPassword4" class="col-sm-10 col-form-label error" id="passwordConfirmError"></label>
                        </div>
                    </div>
                    <div class="form-actions">
                        <a class="btn btn-outline-secondary" href="/">Back</a>
                        <button type="button" onClick={onSubmit} class="btn btn-outline-success">Sign up</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default RegistrationForm