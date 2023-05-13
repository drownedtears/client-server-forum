import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Main from "./Components/Main/Main"
import Login from "./Components/Login/Login"
import Registration from './Components/Registration/Registration';
import ForumPage from './Components/Forum/Forum';
import CreateArticle from './Components/CreateArticle/CreateArticle';
import UsersGridPage from './Components/UsersGridPage/UsersGridPage';
import ArticlesGridPage from './Components/ArticlesGridPage/ArticlesGridPage';

import { Route, Routes, BrowserRouter } from "react-router-dom"

const App = () => {
    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/forum' element={<ForumPage/>}/>
          <Route path='/forum/add' element={<CreateArticle/>}/>
          <Route path='/forum/users' element={<UsersGridPage/>}/>
          <Route path='/forum/articles' element={<ArticlesGridPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
