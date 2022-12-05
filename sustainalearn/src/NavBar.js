import React from "react"
import './NavBar.css';
import Login from './Login';

function NavBar() {
    return (
        <div className="NavBar">
            <a href="/submission">
                <button type="button" class="button"> Contribute </button>
            </a>
            <a href="/">
                <button class="button"> Home </button>
            </a>
            <a href="/about">
                <button class="button"> About Us </button>
            </a>
	    <Login/>
        </div>
    )
}
export default NavBar;
