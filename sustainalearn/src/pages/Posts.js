import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Post from './Post'

const Posts = ({ currentUserID }) => {
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
    }
    console.log(parentPosts);

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
                {parentPosts.map((parent) => (
                    <Post
                        key={parent.id}
                        post={parent}
                        replies={getReplies(parent.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Posts;