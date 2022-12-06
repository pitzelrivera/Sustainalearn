import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios'
import { User, Post, ArticleInfo, Tag, ArticleTag, SubmissionInfo } from "../../db/types";
import readError from "../../db/errorHandle";
import SearchBar from "../../SearchBar"
import './Search.css'

var articleList = [];
var postList = [];

const Search = () => {

    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [articleID, setArticleID] = useState('')
    const [parentID, setParentID] = useState('')
    const [message, setMessage] = useState('')
    const [highlight, setHighlight] = useState('')
    const [postList, setPostList] = useState([])
    const [userList, setUserList] = useState([])


    return (
        <div className="search">
            <>
                <SearchBar/>
            </>
        </div>
    )
}

export default Search;