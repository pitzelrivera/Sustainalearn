import React from "react"
import { useState } from 'react';
import Axios from 'axios'
import readError from "./db/errorHandle";
import './SearchBar.css';
import { Link } from "react-router-dom";

//var articleList = [];

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    var [articleList, setArticleList] = useState([])

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
            <div className="dataResults">
                <table className="dataTable">
                    <tbody>
                        {articleList.length > 0 && articleList.map(article =>
                            <button class="articleButton"> 
                                <Link to={`/article/${article.id}`} className="articleLink">
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
        </div>
    )
}
export default SearchBar;
