import React from "react"
import './NavBar.css';
import Login from './Login';

function NavBar() {
    return (
        <div className="NavBar">
            <a href="/search">
                <button type="button" class="button"> Search </button>
            </a>
            <a href="/articles">
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
