import './NavBar.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import Axios from 'axios'
import { User, Post, Article, Tag, ArticleTag } from "./db/types";
import readError from "./db/errorHandle";
import './Login.css';

export let currentUser = null;

const clientId = "582207653637-v3rikhn31efm2nshrtbclkq4bqogeh47.apps.googleusercontent.com";
function Login() {
	var [user, setUser] = useState({});

	function handleCallback(response) {
		console.log("JWT Token:" + response.credential);
		var userObject = jwt_decode(response.credential);
		console.log(userObject);
		setUser(userObject);
		currentUser = userObject.sub;
		console.log(currentUser);

		const newUser = new User(userObject.sub, userObject.name, userObject.email, 0)
		Axios.post("http://localhost:3001/api/createUser", { User: newUser })
			.then(error => {
				//console.log(error);
				const errorMessage = readError(error);
				console.log(errorMessage);
			});
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: clientId,
			callback: handleCallback
		});
		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{ theme: "outline", size: "large"}
		);
	}, []);

	return (
		<div>
			<div id="signInDiv"></div>
			{ user &&
				<div>
					<img className={"userImage"} src={user.picture}></img>
					<div className={"username"}>{user.name}</div>
				</div>
			}
		</div>
	);
}

export default Login;