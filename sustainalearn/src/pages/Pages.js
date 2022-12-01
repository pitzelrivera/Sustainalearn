import React, { Component } from 'react';
import App from "../App";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import { User, Post, ArticleInfo, Tag, ArticleTag } from "../db/types";
import readError from "../db/errorHandle";
import './Pages.css';

const Pages = () => {

    const [postList, setPostList] = useState([])
    const [articleList, setArticleList] = useState([])

    useEffect(() => {
        console.log("PAGE LOADED");

        const getData = async () => {
            const res1 = await Axios.get("http://localhost:3001/api/getArticle/1")
                .then(response => {
                    setArticleList(response.data);
                });

            const res2 = await Axios.get("http://localhost:3001/api/getArticlePosts/1")
                .then(response => {
                    setPostList(response.data);
                });
        }
        getData();

    }, []);
    

    return (
        <div>
            <h2>Article Page!</h2>
            <div className="parent">
                {articleList.length > 0 && articleList.map(info =>
                    <div className="article">
                        Title: {info.title}
                    </div>
                )}
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