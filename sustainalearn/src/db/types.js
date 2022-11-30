class User {
    constructor(id, username, email, registeredAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.registeredAt = registeredAt;
    }
}

class Post {
    constructor(id, userID, username, articleID, parentID, message, highlight, score, postedAt) {
        this.id = id;
        this.userID = userID;
        this.username = username;
        this.articleID = articleID;
        this.parentID = parentID;
        this.message = message;
        this.highlight = highlight;
        this.score = score;
        this.postedAt = postedAt;
    }
}

class ArticleInfo {
    constructor(id, title, content, source, doi, references, enteredAt, publishedAt, view, posts) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.source = source;
        this.doi = doi;
        this.references = references;
        this.enteredAt = enteredAt;
        this.publishedAt = publishedAt;
        this.view = view;
        this.posts = posts;
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

module.exports = { User, Post, ArticleInfo, Tag, ArticleTag };