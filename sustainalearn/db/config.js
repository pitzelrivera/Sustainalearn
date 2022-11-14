const mysql = require('mysql')
const db = mysql.createPool({
	host: "us-cdbr-east-06.cleardb.net",
	user: "b7c4e7e04e6289",
	password: "56deb933",
	database: "heroku_a0ab400d245e966"
})

module.exports = db;