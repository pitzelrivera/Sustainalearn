import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Post from './Post'

const Posts = ({ currentUserID }) => {
    const [postList, setPostList] = useState([]);
    const { id } = useParams();
    const postsUrl = "http://localhost:3001/api/getArticlePosts/" + id.toString();
    const parentPost = postList.filter(
        (postList) => postList.parentId == null
    );

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
        <div className={"posts"}>This is the Posts
            <div className={"postsTitle"}>Posts!</div>
            <div className={"postContainer"}>
                {parentPost.map(parent => (
                    <div>{parent.message}</div>
                ))}
            </div>
        </div>
    )
}

export default Posts;