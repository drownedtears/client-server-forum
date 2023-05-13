import React from "react"
import "./CreateArticleStyle.css"
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

async function savePost(event) {
    event.preventDefault();
    var header = document.getElementById("mytextarea-header").value;
    var content = document.getElementById("mytextarea-content").value;

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
        const response = await axios.post('http://localhost:5555/forum/add', bodyData, configHeaders);
        window.location.replace("http://localhost:3000/forum");

    } catch (error) {
        console.error(error);
        window.location.replace("http://localhost:3000/forum");
    }
}

const CreateArticle = () => {
    return (
        <>
            <h1 class="display-4">Create new article</h1>
            <form class="main-form" method="post">
                <div class="input-group-art-1 input-group int-a">
                    <span class="input-group-text">Header</span>
                    <textarea maxLength="30" class="form-control textarea" aria-label="Header " id="mytextarea-header"> </textarea>
                </div>
                <div class="input-group-art-1 input-group int-a">
                    <span class="input-group-text">Content</span>
                    <textarea maxLength="300" class="int-a form-control textarea" aria-label="Content" id="mytextarea-content"> </textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-outline-success" onClick={(event) => savePost(event)}>Post</button>
                    <a class="btn btn-outline-secondary" href="/forum">Back</a>
                </div>
            </form>
        </>
    )
}
export default CreateArticle