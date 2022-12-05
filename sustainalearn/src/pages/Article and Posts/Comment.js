import React, {Component} from "react";
import "./Formatting/Comment.css"

const Comment = ({ post, replies }) => {
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