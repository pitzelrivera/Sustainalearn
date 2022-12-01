const Axios = require('axios')
const _ = require('lodash')

function removeDuplicates(array, property) {
    return array.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[property]).indexOf(obj[property]) === pos;
    })
}

async function searchHelper(tag) {
    // Fetch articles with content containing the word
    var articleArray = [];
    url = "http://localhost:3001/api/getArticleKeyword/" + tag;

    const result1 = await Axios.get(url)
        .then((response) => {
            articleArray.push(response.data);
        })
    copy = articleArray;
    articleArray = _.flatten(copy);

    //Fetch articles with titles containing the word
    url = "http://localhost:3001/api/getArticleTitleKeyword/" + tag;

    const result2 = await Axios.get(url)
        .then((response) => {
            articleArray.push(response.data);
        })
    copy = articleArray;
    articleArray = _.flatten(copy);
    articleArray = removeDuplicates(articleArray, 'id');

    // Fetch tags that match input
    var tagArray;
    var url = "http://localhost:3001/api/getTag/" + tag;
    const result = await Axios.get(url)
        .then((response) => {
            tagArray = (response.data);
        })
    //console.log("tagArray: ");
    //console.log(tagArray);

    if (tagArray.length === 0) {
        return articleArray;
    }

    // Fetch all article/tag pairs of found tags
    var articletagArray = [];
    for (let i = 0; i < tagArray.length; i++) {
        url = "http://localhost:3001/api/getArticleTagsTID/" + (tagArray[i].id).toString();

        const result = await Axios.get(url)
            .then((response) => {
                if (response.data.length != 0) {
                    articletagArray.push(response.data);
                }
            })
    }
    var copy = articletagArray;
    articletagArray = _.flatten(copy);
    //console.log("articletagArray: ");
    //console.log(articletagArray);

    if (articletagArray.length === 0) {
        return articleArray;
    }

    // Fetch all matching articles
    var articleArray = [];
    for (let i = 0; i < articletagArray.length; i++) {
        url = "http://localhost:3001/api/getArticle/" + (articletagArray[i].articleID).toString();

        const result = await Axios.get(url)
            .then((response) => {
                articleArray.push(response.data);
            })
    }
    var copy = articleArray;
    articleArray = _.flatten(copy);
    //console.log("articleArray: ");
    //console.log(articleArray);

    articleArray = removeDuplicates(articleArray, 'id');
    return articleArray;
}

module.exports = { removeDuplicates, searchHelper };