import React, {Component, useState} from "react";
import './PostBox.css'

const PostBox = ({handleSubmit, submitLabel}) => {
    const [message, setMessage] = useState("");
    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(message)
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea
                className={"submissionForm"}
                value={message}
                onChang={(e) => setMessage(e.target.value)}
            />
            <button className={"submitButton"}>
                {submitLabel}
            </button>
        </form>
    )
}

export default PostBox;
