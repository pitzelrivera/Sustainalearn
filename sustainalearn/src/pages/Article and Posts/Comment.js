import React, {Component} from "react";
import "./Formatting/Comment.css"
import PostBox from "./PostBox";

const Comment = ({ currentUser, post, replies, typedPost, setTypedPost, addPost }) => {
    const canReply = Boolean(currentUser);
    const createdAt = new Date(post.postedAt).toLocaleDateString();
    const isReplying =
        typedPost &&
        typedPost.type === "replying" &&
        typedPost.id === post.id;
    return (
        <div className={"posts"}>
            <div className={"postContent"}>
                <div className={"postAuthor"}>
                    <b>{post.username}</b>: {createdAt}
                </div>
            </div>
            <div className={"postText"}>
                {post.message}
            </div>
            <div className={"actions"}>
                {canReply && <div className={"action"} onClick={() =>
                    setTypedPost({id: post.id, type: "replying"})
                }>Reply</div>}
            </div>
            {isReplying && (
                <PostBox submitLabel={"Reply"} handleSubmit={(message) => addPost(message, post.id, currentUser)}/>
            )}
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