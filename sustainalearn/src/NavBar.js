import React from "react"
import './NavBar.css';

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
            <a href="/login">
                <button type="button" class="button"> Login </button>
            </a>
            <a href="/about">
                <button type="button" class="button"> About Us </button>
            </a>
        </div>
    )
}
export default NavBar;