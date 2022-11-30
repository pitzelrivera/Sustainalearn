import React, { Component } from 'react';
import App from "../App";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios'
import { User, Post, Article, Tag, ArticleTag } from "../db/types";
import readError from "../db/errorHandle";

const DUMMY_DATA = [
    {
        senderId: "perborgen",
        text: "who'll win?"
    },
    {
        senderId: "janedoe",
        text: "who'll win?"
    }
]

const Pages = () => {
        const { id } = useParams();
        return (
            <div>
                <h1>This is the Article Page for page: {id}</h1>
            </div>
        )
}

export default Pages;