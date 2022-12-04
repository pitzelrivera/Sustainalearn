import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Comment from './Post'
import PostBox from "./PostBox";
import './Posts.css'
import readError from "../db/errorHandle";
import {Post} from "../db/types";

const Posts = ({ currentUserID, articleID }) => {
    const [postList, setPostList] = useState([]);
    const { id } = useParams();
    const postsUrl = "http://localhost:3001/api/getArticlePosts/" + id.toString();
    const parentPosts = postList.filter(
        (postList) => postList.parentID == null
    );
    const getReplies = (postID) => {
        return postList
            .filter((post) => post.parentID === postID)
            .sort((a, b) =>
                new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
        );
    };


    const addPost = (message, parentID) => {
        console.log("addComment", message, parentID);
        const newPost =
            new Post(0, currentUserID, "admin", articleID, null, message,
                "", 0, 0);
        console.log("Making post!");
        console.log(newPost);

        const makePost = async (newPost) => {
            Axios.post("http://localhost:3001/api/createPost", {Post: newPost})
                .then(error => {
                    setPostList([postList, newPost]);
                    console.log(postList);
                });
        }
        makePost(newPost);

    }

    useEffect(() => {
        const getPosts = async () => {
            const result = await Axios.get(postsUrl)
                .then(response => {
                    setPostList(response.data);
                });
        }
        getPosts();
    }, []);


    return (
        <div className={"chatContainer"}>
            <div className={"posts"}>
                <div className={"postContainer"}>
                    {parentPosts.map((parent) => (
                        <Comment
                            key={parent.id}
                            post={parent}
                            replies={getReplies(parent.id)}
                        />
                    ))}
                </div>
            </div>
            <div className={"postForm"}>
                Time to discuss!
                <PostBox submitLabel={"Write"} handleSubmit={addPost}/>
            </div>
        </div>
    )
}

export default Posts;