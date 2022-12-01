import React, { Component } from 'react';
import { useState } from 'react';
import Axios from 'axios'
import { User, Post, Article, Tag, ArticleTag } from "../db/types";
import readError from "../db/errorHandle";
import SearchBar from "../SearchBar"
import './Search.css'

const Search = () => {

    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [articleID, setArticleID] = useState('')
    const [parentID, setParentID] = useState('')
    const [message, setMessage] = useState('')
    const [highlight, setHighlight] = useState('')
    const [postList, setPostList] = useState([])
    const [userList, setUserList] = useState([])

    const submitPost = () => {
        const newPost = new Post(0, userID, username, articleID, parentID, message, highlight, 0, 0);
        //const newUser = new User(3, "new user", "test email", 0)

        /*Axios.post("http://localhost:3001/api/createUser", { User: newUser })
            .then(error => {
                //console.log(error);
                const errorMessage = readError(error);
                console.log(errorMessage);
            });

        Axios.get("http://localhost:3001/api/getUsers")
            .then((response) => {
                setUserList(response.data);
                console.log(userList);
            })
        */
        
        Axios.post("http://localhost:3001/api/createPost", { Post: newPost })
            .then(error => {
                //console.log(error);
                const errorMessage = readError(error);
                console.log(errorMessage);
            });

        Axios.get("http://localhost:3001/api/getArticlePosts/1")
            .then((response) => {
                setPostList(response.data);
                console.log(postList);
            })
        
    };

    return (
        <div className="search">
            <h1>Search</h1>
            <>
                <label> userID </label>
                <input
                    type="number"
                    name="userID"
                    onChange={(e) => { setUserID(e.target.value);
                    }}
                />

                <label> username </label>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => {
                        setUsername(e.target.value);
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
            <button onClick={submitPost}> Submit </button>
            <>
                <SearchBar/>

            </>
        </div>
    )
}

export default Search;