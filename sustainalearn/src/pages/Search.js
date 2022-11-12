import React, { Component } from 'react';
import { useState } from 'react';
import Axios from 'axios'
import { User, Post, Article, Tag, ArticleTag } from "../types";

const Search = () => {

    const [userID, setUserID] = useState('');
    const [articleID, setArticleID] = useState('')
    const [parentID, setParentID] = useState('')
    const [message, setMessage] = useState('')
    const [highlight, setHighlight] = useState('')

    const submitUser = () => {
        const newPost = new Post(0, userID, articleID, parentID, message, highlight, 0, 0);
        console.log(newPost);

        Axios.post("http://localhost:3001/api/createPost", {
            Post: newPost
        });
    };

    return (
        <>
            <h1>Search</h1>
            <>
                <label> userID </label>
                <input
                    type="number"
                    name="userID"
                    onChange={(e) => { setUserID(e.target.value);
                    }}
                />

                <label> articleID </label>
                <input
                    type="number"
                    name="articleID"
                    onChange={(e) => {
                        setArticleID(e.target.value);
                    }}
                />

                <label> parentID </label>
                <input
                    type="number"
                    name="parentID"
                    onChange={(e) => {
                        setParentID(e.target.value);
                    }}
                />

                <label> message </label>
                <input
                    type="text"
                    name="message"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />

                <label> highlight </label>
                <input
                    type="text"
                    name="highlight"
                    onChange={(e) => {
                        setHighlight(e.target.value);
                    }}
                />
            </>
            <button onClick={submitUser}> Submit </button>
        </>
    )
}

export default Search;