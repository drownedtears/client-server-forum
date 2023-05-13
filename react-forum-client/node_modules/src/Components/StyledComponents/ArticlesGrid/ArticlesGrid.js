import React from "react"
import "./ArticlesGridStyle.css"
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

async function getArticles(header, content) {
    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }

    const bodyData = {
        'header': header,
        'content': content
    }
    
    try {
        const response = await axios.post('http://localhost:5555/forum/admin/articles/' + header, bodyData, configHeaders);
        console.log(response.data);
       
        document.getElementById("tbody").innerHTML = response.data.map(article =>    
            `<tr>
                <td>${article.id}</td>
                <td class="table-header">${article.header}</td>
                <td class="table-content">${article.content}</td>
                <td class="table-rating">${article.rating}</td>
                <td>${article.author}</td>
                <td id="button_delete">
                    <form method="post" id="f-delete">
                        <input type="hidden" id="id-hidden" value="${article.id}"/>
                        <button class="btn btn-outline-danger" id="article-delete" type="submit">Delete</button>
                    </form>
                </td>
            </tr>`       
        ).join('');

        document.querySelectorAll('#f-delete').forEach(element => {
            element.addEventListener('submit', async (event) => {
                event.preventDefault(); 
                const form = event.target; 
                const id = form.querySelector('#id-hidden').value; 
                await deleteArticle(id);
            });
        });

        document.querySelector('#find-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            await getArticles(event.target.querySelector('#header-input').value, '');
        })

    } catch (error) {
        console.error(error);
    }
}

async function deleteArticle(id) {
    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }
    
    try {
        const response = await axios.get('http://localhost:5555/forum/admin/articles/delete/' + id, configHeaders);
        console.log(response);
        getArticles('', '');

    } catch (error) {
        console.error(error);
    }
}

const ArticlesGrid = () => {
    getArticles('', '');
    return (
        <>
           <h1 class="display-4">All articles</h1>
            <div class="actions">
                <a class="btn btn-outline-secondary" href="/">Back</a>
                <div class="input-group ia mb-3">
                <form id="find-form" class="input-group-form" method="post">
                    <input type="text" id="header-input" class="form-control" placeholder="Article's header" aria-label="Article's header" aria-describedby="button-addon2"/>
                    <button class="btn btn-outline-primary" type="submit" id="button-addon2">Find</button>
                </form>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Header</th>
                        <th scope="col">Content</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Author</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                   
                </tbody>
            </table>
        </>
    )
}
export default ArticlesGrid