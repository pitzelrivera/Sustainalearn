/*
const express = require('express');
const operation = require('./db/operations');
const cors = require('cors');

operation.getUsers().then(res => {
    console.log(res);
})
*/

//import { Article, Post, User } from "./src/types";
const express = require('express');
const db = require('./db/config')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Article, Post, User } = require('./src/types')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

function makeUsers(result) {
    var userArray = [];
    for (i = 0; i < result.length; i++) {
        const id = result[i].id;
        const username = result[i].username;
        const email = result[i].email;
        const registeredAt = result[i].registeredAt;
        userArray.push(new User(id, username, email, registeredAt));
    }
    return userArray;
}

function makePosts(result) {
    var postArray = [];
    for (i = 0; i < result.length; i++) {
        const id = result[i].id;
        const userID = result[i].userID;
        const articleID = result[i].articleID;
        const parentID = result[i].parentID;
        const message = result[i].message;
        const highlight = result[i].highlight;
        const score = result[i].score;
        const postedAt = result[i].postedAt;
        postArray.push(new Post(id, userID, articleID, parentID, message, highlight, score, postedAt));
    }
    return postArray;
}

function makeArticles(result) {
    var articleArray = [];
    for (i = 0; i < result.length; i++) {
        const id = result[i].id;
        const title = result[i].title;
        const content = result[i].content;
        const source = result[i].source;
        const doi = result[i].doi;
        const references = result[i].references;
        const enteredAt = result[i].enteredAt;
        const publishedAt = result[i].publishedAt;
        const view = result[i].view
        articleArray.push(new Article(id, title, content, source, doi, references, enteredAt, publishedAt, view));
    }
    return articleArray;
}

///////////////////////////////// USER ROUTES /////////////////////////////////

// Route to get all users
app.get("/api/getUsers", (req, res) => {
    const sqlSelect =
        "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        userArray = makeUsers(result);
        console.log(userArray);
        res.send(userArray);
    });
})

// Route to get a user
app.get("/api/getUser/:id", (req, res) => {
    const id = req.params.id;

    const sqlSelect =
        "SELECT * FROM user WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        userArray = makeUsers(result);
        console.log(userArray);
        res.send(userArray);
    });
})

// Route to create a user
app.post("/api/createUser", (req, res) => {
    const username = req.body.User.username;
    const email= req.body.Post.email;
    var date = new Date();
    const registeredAt = date.toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert =
        "INSERT INTO userpost (username, email, registeredAt) VALUES (?,?,?)";
    db.query(sqlInsert, [username, email, registeredAt], (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});

// Route to delete a user
app.post("/api/deleteUser/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM user WHERE id = ?";
    db.query(sqlUpdate, id, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////// POST ROUTES /////////////////////////////////

// Route to get all posts on an article
app.get("/api/getArticlePosts/:id", (req, res) => {
    const id = req.params.id;

    const sqlSelect =
        "SELECT * FROM userpost WHERE articleID = ?";
    db.query(sqlSelect, id, (err, result) => {
        if (err) { console.log(err) }
        postArray = makePosts(result);
        console.log(postArray);
        res.send(postArray);
    });
});

// Route to like a post
app.post("/api/likePost/:id", (req, res) => {
    const id = req.params.id;

    const sqlUpdate =
        "UPDATE userpost SET score = score + 1 WHERE id = ?";
    db.query(sqlUpdate, id, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});

// Route to create a post on an article
app.post("/api/createPost", (req, res) => {
    const userID = req.body.Post.userID;
    const articleID = req.body.Post.articleID;
    var parentID = req.body.Post.parentID;
    const message = req.body.Post.message;
    var highlight = req.body.Post.highlight;

    if (req.body.Post.parentID == '') { parentID = null }
    if (req.body.Post.highlight == '') { highlight = null }
    const score = 0;
    var date = new Date();
    const postedAt = date.toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert =
        "INSERT INTO userpost (userID, articleID, parentID, message, highlight, score, postedAt) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [userID, articleID, parentID, message, highlight, score, postedAt], (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});

// Route to delete a post
app.post("/api/deletePost/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM userpost WHERE id = ?";
    db.query(sqlUpdate, id, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});
///////////////////////////////////////////////////////////////////////////////


//////////////////////////////// ARTICLE ROUTES ///////////////////////////////

// Route to get all articles
app.get("/api/getArticles", (req, res) => {
    const sqlSelect =
        "SELECT * FROM article";
    db.query(sqlSelect, (err, result) => {
        articleArray = makeArticles(result);
        console.log(articleArray);
        res.send(articleArray);
    });
})

// Route to get an article
app.get("/api/getArticle/:id", (req, res) => {
    const id = req.params.id;

    const sqlSelect =
        "SELECT * FROM article WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        console.log(result);
        res.send(result);
    });
})

// Route to create an article
app.post("/api/createArticle", (req, res) => {
    const title = req.body.Article.title;
    const content = req.body.Article.content;
    const source = req.body.Article.source;
    const doi = req.body.Article.doi;
    const references = req.body.Article.references;
    const publishedAt = req.body.Article.publishedAt;
    const view = req.body.Article.view
    var date = new Date();
    const enteredAt = date.toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert =
        "INSERT INTO article (title, content, source, doi, references, enteredAt, publishedAt, view) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [title, content, source, doi, references, enteredAt, publishedAt, view], (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});

// Route to delete an article
app.post("/api/deleteUser/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM article WHERE id = ?";
    db.query(sqlUpdate, id, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});
///////////////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
    console.log("running on port 3001");
});