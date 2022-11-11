class User {
    constructor(username, email, registeredAt) {
        this.username = username;
        this.email = email;
        this.registeredAt = registeredAt;
    }
}
//module.exports = User;

class Post {
    constructor(userID, articleID, parentID, message, highlight, score, postedAt) {
        this.userID = userID;
        this.articleID = articleID;
        this.parentID = parentID;
        this.message = message;
        this.highlight = highlight;
        this.score = score;
        this.postedAt = postedAt;
    }
}
//module.exports = Post;

class Article {
    constructor(title, content, source, doi, references, enteredAt, publishedAt, view) {
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
module.exports = { Article, Post, User };