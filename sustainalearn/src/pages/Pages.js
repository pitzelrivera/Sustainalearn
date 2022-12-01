import React, { Component } from 'react';
import App from "../App";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios'
import { User, Post, ArticleInfo, Tag, ArticleTag } from "../db/types";
import readError from "../db/errorHandle";
import './Pages.css';

const Pages = () => {
    Axios.get("http://localhost:3001/api/getArticle/1")
        .then(result => {
            console.log(result.data);
        });

    return (
        <div>
            <h2>Article Page!</h2>
            <div className = "parent">
                <div className= "article">
                    something here
                </div>
                <div className="posts">
                    something else here
                </div>
            </div>
            <div>
                <body>
                    more content here below<br/>
                    a lot<br/>
                    .<br/>
                    .<br/>
                    .<br/>
                    .
                    .
                    more
                </body>
            </div>
        </div>
    )
};

export default Pages;