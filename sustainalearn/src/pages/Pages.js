import React, { Component } from 'react';
import App from "../App";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios'
import { User, Post, ArticleInfo, Tag, ArticleTag } from "../db/types";
import readError from "../db/errorHandle";
import './Pages.css';

const Pages = () => {
    const [article, setArticle] = useState([]);
    const { id } = useParams();
    const url = "http://localhost:3001/api/getArticle/" + id.toString();
    React.useEffect(() => {
        Axios.get(url)
            .then(result => {
                setArticle(result.data);
                console.log(result.data);
            })}, [])
    const doc = article.at(0);

    return (
        <div>
            <h2>Article Page!</h2>
            <div className = "parent">
                <div className= "article">
                    <div className={"docTitle"}>{doc.title}</div>
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