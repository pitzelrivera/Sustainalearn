import React, {Component} from "react";
import "./Formatting/Comment.css"
import {currentUser} from "../../Login";

const Comment = ({ post, replies }) => {

    //const canEdit = currentUser.id === post.userID;
    return (
        <div className={"posts"}>
            <div className={"postContent"}>
                <div className={"postAuthor"}>
                    <b>{post.username}</b>: {post.postedAt}
                </div>
            </div>
            <div className={"postText"}>
                {post.message}
            </div>
            <div className={"actions"}>
                <div className={"action"}>Reply</div>
            </div>
                {replies.length > 0 && (
                    <div className={"replies"}>
                        {replies.map(reply => (
                            <Comment post={reply} key={reply.id} replies={[]}/>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default Comment;