import React from "react"
import "./UsersGridStyle.css"
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

async function getUsers(name) {
    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }

    const bodyData = {
        'username': name
    }
    
    try {
        const response = await axios.post('http://localhost:5555/forum/admin/users/' + name, bodyData, configHeaders);
        console.log(response.data);
       
        document.getElementById("tbody").innerHTML = response.data.map(user =>    
            `<tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.regDate}</td>
                <td>${user.banned}</td>
                <td id="button_delete">
                    <form id="ban-user" method="post">
                        <input type="hidden" id="username-hidden" name="username" value="${user.username}"/>
                        <button class="btn btn-outline-danger" type="submit">${user.banned === true ? 'Unban' : 'Ban'}</button>
                    </form>
                </td>
            </tr>`       
        ).join('');

        document.querySelectorAll('#ban-user').forEach(element => {
            element.addEventListener('submit', async (event) => {
                event.preventDefault(); 
                const form = event.target; 
                const username = form.querySelector('#username-hidden').value; 
                await banUser(username);
            });
        });

        document.querySelector('#find-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            await getUsers(event.target.querySelector('#username-input').value);
        })

    } catch (error) {
        console.error(error);
    }
}

async function banUser(username) {
    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }
    
    try {
        const response = await axios.get('http://localhost:5555/forum/admin/users/ban/' + username, configHeaders);
        console.log(response.data);
        getUsers('');

    } catch (error) {
        console.error(error);
    }
}

const UsersGrid = () => {
    getUsers('');
    return (
        <>
           <h1 class="display-4">All users</h1>
            <div class="actions">
                <a class="btn btn-outline-secondary" href="/">Back</a>
                <div class="input-group int mb-3">
                    <form class="input-group-form" id="find-form" method="post">
                        <input id="username-input" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="button-addon2"/>
                        <button class="btn btn-outline-primary" type="submit" id="button-addon2">Find</button>
                    </form>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Reg. date</th>
                        <th scope="col">Is banned</th>
                        <th scope="col">Ban</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    
                </tbody>
            </table>
        </>
    )
}
export default UsersGrid