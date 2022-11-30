import React from "react"
import './NavBar.css';
import Login from './Login';

function NavBar() {
    return (
        <div className="NavBar">
            <a href="/submission">
                <button type="button" class="button"> Submit an Article! </button>
            </a>
            <a href="/Pages.js">
                <button type="button" class="button"> Articles </button>
            </a>
            <a href="/">
                <button type="button" class="button"> Home </button>
            </a>
            <a href="/about">
                <button type="button" class="button"> About Us </button>
            </a>
	    <Login/>
        </div>
    )
}
export default NavBar;
