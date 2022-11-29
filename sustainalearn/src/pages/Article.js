import React, { Component } from 'react';
import App from "../App";

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

class Article extends React.Component{

    constructor() {
        super()
        this.state = {
            messages: DUMMY_DATA
        }
    }

    render() {
        return (
            <div>
                <h1>This is the Article Page</h1>
                <MessageList messages = {this.state.messages}/>
            </div>
        )
    }
}

class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map(message => {
                    return (
                        <li key={message.id}>
                            <div>
                                {message.senderId}
                            </div>
                            <div>
                                {message.text}
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Article;