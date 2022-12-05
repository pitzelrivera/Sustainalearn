import React, { Component } from 'react';
import React, { useReducer, useState } from 'react';
import './Submission.css';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const Submission = () => {
    const [url, setURL] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {})
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
            });
            window.location.reload(true);
        }, 3000)

        setURL('');
    }

    const handleChange = event => {
        setURL(event.target.value);

        //extract domain and check if it ends in .com, .edu, or .org
        let domain = new URL(event.target.value).hostname.slice(-4);

        switch (domain) {
            case ".com":
            case ".org":
            case ".edu":
                setFormData({
                    name: event.target.name,
                    value: event.target.value,
                })
                break;
            default:
                setFormData({
                    name: event.target.name,
                    value: "",
                })
        }

    }

    return (
        <h1>This is the submission page</h1>
        <div className="submission">
            <h2>Contribute to Our Archive of Articles</h2>
            <form onSubmit={handleSubmit}>
            <fieldset>
                <label>
                    <h3>Found an Article You Think We Should Add, Insert Down Below!</h3>
                    {submitting &&
                    <div>Checking Article...
                        <ul>
                            {Object.entries(formData).map(([name, value]) => (
                                <li key={name}>{value.toString()}</li>
                            ))}
                        </ul>
                    </div>
                    }
                    <input 
                    className="submit"
                    name = "url"
                    placeholder="Insert URL to Article..."
                    onChange={handleChange}
                    value={url}
                    />
                </label>
            </fieldset>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

