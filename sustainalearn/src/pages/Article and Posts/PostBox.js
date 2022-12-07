import React, {Component, useState} from "react";
import './Formatting/PostBox.css'

const PostBox = ({handleSubmit, submitLabel, currentUser}) => {
    const [message, setMessage] = useState("");
    const isTextDisabled = message.length === 0;
    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(message, null, currentUser);
        setMessage("");
    };

    return (
        <form onSubmit={onSubmit}>
            <textarea
                className={"submissionForm"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className={"submitButton"} disabled={isTextDisabled}>
                {submitLabel}
            </button>
        </form>
    )
}

export default PostBox;
