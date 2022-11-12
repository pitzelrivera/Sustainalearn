class User {
    constructor(id, username, email, registeredAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.registeredAt = registeredAt;
    }
}

class Post {
    constructor(id, userID, articleID, parentID, message, highlight, score, postedAt) {
        this.id = id;
        this.userID = userID;
        this.articleID = articleID;
        this.parentID = parentID;
        this.message = message;
        this.highlight = highlight;
        this.score = score;
        this.postedAt = postedAt;
    }
}

class Article {
    constructor(id, title, content, source, doi, references, enteredAt, publishedAt, view) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.source = source;
        this.doi = doi;
        this.references = references;
        this.enteredAt = enteredAt;
        this.publishedAt = publishedAt;
        this.view = view;
    }
}

class Tag {
    constructor(id, tag) {
        this.id = id;
        this.tag = tag;
    }
}

class ArticleTag {
    constructor(articleID, tagID) {
        this.articleID = articleID;
        this.tagID = tagID;
    }
}

module.exports = { User, Post, Article, Tag, ArticleTag };