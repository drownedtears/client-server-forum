import React from "react"
import "./ForumStyle.css"
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

async function changeRate(id, header, content, author_id, rating, diff) {
    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }

    const bodyData = {
        'id': id,
        'header': header,
        'content': content,
        'rating' : parseInt(rating) + diff,
        'author_id': author_id
    }

    try {
        const response = await axios.post('http://localhost:5555/forum/rate', bodyData, configHeaders);
        console.log(response.data);
        getArticles();
    } catch(error) {
        console.error(error);
    }
}

async function getArticles() {
    const configHeaders = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios.get('http://localhost:5555/forum/articles', configHeaders);
        console.log(response.data);

        document.getElementById("articles").innerHTML = response.data.map(article =>    
            `<div class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${article.header}</h5>
                    <small>${article.cre_date}</small>
                </div>
                <p class="mb-1 article-content">${article.content}</p>
                <small class="by-user">${article.author}</small>
                <form class="rating-form" id="rating-f-add" method="post">
                    <input type="hidden" name="id" id="a-id" value="${article.id}"/>
                    <input type="hidden" name="header" id="a-header" value="${article.header}"/>
                    <input type="hidden" name="content" id="a-content" value="${article.content}"/>
                    <input type="hidden" name="rating" id="a-rating" value="${article.rating}"/>
                    <input type="hidden" name="author_id" id="a-author_id" value="${article.author_id}"/>
                    <small>
                        <button class="btn btn-outline-success" id="rate-add" type="submit"}>&#9650;</button>
                        <span class="rating">${article.rating}</span>
                    </small>
                </form>
                <form class="rating-form" id="rating-f-remove" method="post">
                <input type="hidden" name="id" id="a-id" value="${article.id}"/>
                <input type="hidden" name="header" id="a-header" value="${article.header}"/>
                <input type="hidden" name="content" id="a-content" value="${article.content}"/>
                <input type="hidden" name="rating" id="a-rating" value="${article.rating}"/>
                <input type="hidden" name="author_id" id="a-author_id" value="${article.author_id}"/>
                    <small>
                        <button class="btn btn-outline-danger" id="rate-remove" type="submit">&#9660;</button>
                    </small>
                </form>
            </div>`       
        ).join('');

        document.querySelectorAll('#rating-f-add').forEach(element => {
            element.addEventListener('submit', async (event) => {
                event.preventDefault(); 
                const form = event.target; 
                const id = form.querySelector('#a-id').value; 
                const header = form.querySelector('#a-header').value; 
                const rating = form.querySelector('#a-rating').value;
                const content = form.querySelector('#a-content').value;
                const author_id = form.querySelector('#a-author_id').value; 
                await changeRate(id, header, content, author_id, rating, 1);
            });
        });

        document.querySelectorAll('#rating-f-remove').forEach(element => {
            element.addEventListener('submit', async (event) => {
                event.preventDefault(); 
                const form = event.target; 
                const id = form.querySelector('#a-id').value; 
                const header = form.querySelector('#a-header').value; 
                const rating = form.querySelector('#a-rating').value;
                const content = form.querySelector('#a-content').value;
                const author_id = form.querySelector('#a-author_id').value; 
                await changeRate(id, header, content, author_id, rating, -1);
            });
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const Forum = () => {

    getArticles();

    return (
        <>
            <div class="actions">
                <a class="btn btn-outline-secondary" href="/">Back</a>
                <a class="btn btn-outline-success" href="/forum/add">Create new</a>
            </div>
            <div class="list-group" id="articles">
               
            </div>
        </>
    )
}
export default Forum