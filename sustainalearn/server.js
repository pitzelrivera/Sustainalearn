const express = require('express');
const db = require('./db/config')
const cors = require('cors')
const bodyParser = require('body-parser')
const { User, Post, Article, Tag, ArticleTag } = require('./db/types')
//const Axios = require ('axios')
//const { useState } = require('react')
//const _ = require('lodash')
const { removeDuplicates, tagHelper } = require('./db/helpers')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const id = req.body.User.id;
    const username = req.body.User.username;
    const email= req.body.User.email;
    var date = new Date();
    const registeredAt = date.toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert =
        "INSERT INTO user (id, username, email, registeredAt) VALUES (?,?,?,?)";
    db.query(sqlInsert, [id, username, email, registeredAt], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(result);
    });
});

// Route to delete a user
app.post("/api/deleteUser/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM user WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
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
    const username = req.body.Post.username;
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
        "INSERT INTO userpost (userID, username, articleID, parentID, message, highlight, score, postedAt) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [userID, username, articleID, parentID, message, highlight, score, postedAt], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            const sqlUpdate =
                "UPDATE article SET posts = posts + 1 WHERE id = ?";
            db.query(sqlUpdate, articleID, (err1, result1) => {
                if (err1) { console.log(err1) }
                console.log(result1);
            });
        }
        console.log(result);
    });
});

// Route to delete a post
app.post("/api/deletePost/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM userpost WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
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

// Route to get an article by ID
app.get("/api/getArticle/:id", /*async*/ (req, res) => {
    const id = req.params.id;

    const sqlSelect =
        "SELECT * FROM article WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        articleArray = makeArticles(result);
        console.log(articleArray);
        res.send(articleArray);
    });
})

// Route to get an article by keyword
app.get("/api/getArticleKeyword/:keyword", (req, res) => {
    const keyword = "%" + req.params.keyword + "%";

    const sqlSelect =
        "SELECT * FROM article WHERE content LIKE ?";
    db.query(sqlSelect, keyword, (err, result) => {
        articleArray = makeArticles(result);
        console.log(articleArray);
        res.send(articleArray);
    });
})

// Route to get an article by tag (NORMAL SEARCH)
app.get("/api/getArticleByTag/:tag", async (req, res) => {
    articleArray = await tagHelper(req.params.tag);
    //console.log("FINAL ARTICLE ARRAY: ", articleArray);
    res.send(articleArray);
})

// Route to get most recent(ly entered into our system) articles
app.get("/api/getArticlesRecent", async (req, res) => {
    //const count = req.params.count;

    // Only hardcoded limit works.

    const sqlSelect =
        "SELECT * FROM article ORDER BY enteredAt DESC LIMIT 5";
    db.query(sqlSelect, /*count,*/ (err, result) => {
        articleArray = makeArticles(result);
        console.log(articleArray);
        res.send(articleArray);
    });
})

// Route to get most popular (commented) articles
app.get("/api/getArticlesPopular", async (req, res) => {

    const sqlSelect =
        "SELECT * FROM article ORDER BY posts DESC LIMIT 5";
    db.query(sqlSelect, /*count,*/(err, result) => {
        articleArray = makeArticles(result);
        console.log(articleArray);
        res.send(articleArray);
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
    const view = req.body.Article.view;
    const posts = 0;
    var date = new Date();
    const enteredAt = date.toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert =
        "INSERT INTO article (title, content, source, doi, references, enteredAt, publishedAt, view, posts) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [title, content, source, doi, references, enteredAt, publishedAt, view, posts], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(result);
    });
});

// Route to delete an article
app.post("/api/deleteArticle/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM article WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});
///////////////////////////////////////////////////////////////////////////////


////////////////////////////////// TAG ROUTES /////////////////////////////////

// Route to get all tags
app.get("/api/getTags", (req, res) => {
    const sqlSelect =
        "SELECT * FROM tag";
    db.query(sqlSelect, (err, result) => {
        tagArray = makeTags(result);
        console.log(tagArray);
        res.send(tagArray);
    });
})

// Route to get a tag by id
app.get("/api/getTagID/:id", (req, res) => {
    const id = req.params.id;

    const sqlSelect =
        "SELECT * FROM tag WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        tagArray = makeTags(result);
        console.log(tagArray);
        res.send(tagArray);
    });
})

// Route to get tags by word
app.get("/api/getTag/:tag", /*async*/ (req, res) => {
    const tag = "%" + req.params.tag + "%"

    const sqlSelect =
        "SELECT * FROM tag WHERE tag LIKE ?";
    db.query(sqlSelect, tag, (err, result) => {
        tagArray = makeTags(result);
        //console.log(tagArray);
        res.send(tagArray);
    });
})

// Route to create a tag
app.post("/api/createTag", (req, res) => {
    const id = req.body.Tag.id;
    const tag = req.body.Tag.tag;

    const sqlInsert =
        "INSERT INTO tag (id, tag) VALUES (?,?)";
    db.query(sqlInsert, [id, tag], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(result);
    });
});

// Route to delete a tag by id
app.post("/api/deleteTagID/:id", (req, res) => {
    const id = req.params.id;

    const sqlDelete =
        "DELETE FROM tag WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});

// Route to delete a tag by word
app.post("/api/deleteTag/:tag", (req, res) => {
    const tag = req.params.tag;

    const sqlDelete =
        "DELETE FROM tag WHERE tag = ?";
    db.query(sqlDelete, tag, (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});
///////////////////////////////////////////////////////////////////////////////


////////////////////////////// ARTICLETAG ROUTES //////////////////////////////

// Route to get all articletags
app.get("/api/getArticleTags", (req, res) => {
    const sqlSelect =
        "SELECT * FROM articletag";
    db.query(sqlSelect, (err, result) => {
        articletagArray = makeArticleTags(result);
        console.log(articletagArray);
        res.send(articletagArray);
    });
})

// Route to get all of an article's tags 
app.get("/api/getArticleTagsAID/:id", async (req, res) => {
    const articleID = req.params.id;

    const sqlSelect =
        "SELECT * FROM articletag WHERE articleID = ?";
    db.query(sqlSelect, articleID, (err, result) => {
        articletagArray = makeArticleTags(result);
        //console.log(articletagArray);
        res.send(articletagArray);
    });
})

// Route to get all of an tag's articles
app.get("/api/getArticleTagsTID/:id", /*async*/ (req, res) => {
    const tagID = req.params.id;

    const sqlSelect =
        "SELECT * FROM articletag WHERE tagID LIKE ?";
    db.query(sqlSelect, tagID, (err, result) => {
        articletagArray = makeArticleTags(result);
        console.log(articletagArray);
        res.send(articletagArray);
    });
})

// Route to create an articletag relation
app.post("/api/createArticleTag", (req, res) => {
    const articleID = req.body.ArticleTag.articleID;
    const tagID = req.body.ArticleTag.tagID;

    const sqlInsert =
        "INSERT INTO articletag (articleID, tagID) VALUES (?,?)";
    db.query(sqlInsert, [articleID, tagID], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(result);
    });
});

// Route to delete an articletag relation
app.post("/api/deleteArticleTag", (req, res) => {
    const articleID = req.body.ArticleTag.articleID;
    const tagID = req.body.ArticleTag.tagID;

    const sqlDelete =
        "DELETE FROM articletag WHERE articleID = ? AND tagID = ?";
    db.query(sqlDelete, [articleID, tagID], (err, result) => {
        if (err) { console.log(err) }
        console.log(result);
    });
});
///////////////////////////////////////////////////////////////////////////////


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
        const username = result[i].username;
        const articleID = result[i].articleID;
        const parentID = result[i].parentID;
        const message = result[i].message;
        const highlight = result[i].highlight;
        const score = result[i].score;
        const postedAt = result[i].postedAt;
        postArray.push(new Post(id, userID, username, articleID, parentID, message, highlight, score, postedAt));
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
        const posts = result[i].posts
        articleArray.push(new Article(id, title, content, source, doi, references, enteredAt, publishedAt, view, posts));
    }
    return articleArray;
}

function makeTags(result) {
    var tagArray = [];
    for (i = 0; i < result.length; i++) {
        const id = result[i].id;
        const tag = result[i].tag;
        tagArray.push(new Tag(id, tag));
    }
    return tagArray;
}

function makeArticleTags(result) {
    var articletagArray = [];
    for (i = 0; i < result.length; i++) {
        const articleID = result[i].articleID;
        const tagID = result[i].tagID;
        articletagArray.push(new ArticleTag(articleID, tagID));
    }
    return articletagArray;
}

app.listen(3001, () => {
    console.log("running on port 3001");
});