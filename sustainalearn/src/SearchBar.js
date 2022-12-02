import React from "react"
import { useState, useEffect } from 'react';
import Axios from 'axios'
import readError from "./db/errorHandle";
import './SearchBar.css';
import { Link } from "react-router-dom";

//var articleList = [];

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [popularArticles, setPopularArticles] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);
    var [articleList, setArticleList] = useState([])

    useEffect(() => {
        console.log("PAGE LOADED");

        const getData = async () => {
            const res1 = await Axios.get("http://localhost:3001/api/getArticlesPopular")
                .then(response => {
                    setPopularArticles(response.data);
                });

            const res2 = await Axios.get("http://localhost:3001/api/getArticlesRecent")
                .then(response => {
                    setRecentArticles(response.data);
                });
        }
        getData();

    }, []);

    async function search(tag) {
        const result = await Axios.get("http://localhost:3001/api/getArticleByTag/" + tag)
            .then((response) => {
                console.log("LIST LENGTH: ", articleList.length);
                setArticleList(response.data);
                console.log("FRONTEND LIST: ", articleList);
                console.log("LIST LENGTH: ", articleList.length);
            })
    }

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            if (searchTerm.length > 1) {
                search(searchTerm);
            }
            else {
                setArticleList([]);
            }
        }
    };


    return (
        <div className="SearchBar">
            <input
                type="text"
                class="searchinput"
                placeholder="Topic or keyword..."
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value)
                }}
                onKeyDown={handleKeyDown}
            />
            {//<button class="searchbutton"> Search </button>
            }
            {articleList.length > 0 &&
                <div className="dataResults">
                    <table className="dataTable">
                        <tbody>
                            {articleList.map(article =>
                                <button className="articleButton">
                                    <Link to={`/pages/${article.id}`} className="articleLink">
                                        <tr key={article.id}>
                                            <td className="Title"> {article.title} </td>
                                            <td className="Content"> {article.content.slice(0, 40)}... </td>
                                            <td className="Source"> {article.source} </td>
                                        </tr>
                                    </Link>
                                </button>
                            )}
                        </tbody>
                    </table>
                </div>
            }
            {articleList.length === 0 &&
                <div className="articleGroups">
                    <div className="popular">
                        Popular Articles
                        <tbody>
                            {popularArticles.map(article =>
                                <button className="groupButton">
                                    <Link to={`/pages/${article.id}`} className="articleLink">
                                        <tr key={article.id}>
                                            <td className="groupTitle"> {article.title} : {article.posts} comments </td>
                                        </tr>
                                    </Link>
                                </button>
                            )}
                        </tbody>
                    </div>
                    <div className="recent">
                        Recent Articles
                        <tbody>
                            {recentArticles.map(article =>
                                <button className="groupButton">
                                    <Link to={`/pages/${article.id}`} className="articleLink">
                                        <tr key={article.id}>
                                            <td className="groupTitle"> {article.title} : {article.enteredAt.slice(0,10)}</td>
                                        </tr>
                                    </Link>
                                </button>
                            )}
                        </tbody>
                    </div>
                </div>
            }
        </div>
    )
}
export default SearchBar;
