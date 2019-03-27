/*
 * Connects to a MySQL database to send info on GET request.
 */

const express = require('express');
const router = express.Router();
// MySQL nodejs module from: https://www.npmjs.com/package/mysql
const mysql = require('mysql');
// Create a connection to MySQL server
const connection = mysql.createConnection({host: 'remotemysql.com', user: 'dXrzjYnA8J', password: 'BbLqTSU7vL', database: 'dXrzjYnA8J'});
// Connect
// TODO: Store data in memory or some type of cache and provide an interface to the MySQL connection.
connection.connect();

/* GET store games */
router.get('/', function(req, res, next) {
	const query = "SELECT * FROM test";
	const id = req.query.game;
	// If game id was provided then search for it.
	if (id){ query = query + " WHERE userid = " + connection.escape(id); }
	// TODO: Create a games table and replace this test code and return some useful data.
	connection.query(query,
		function (error, results, fields) {
			if (error){ console.log("MYSQL ERROR"); return; };
			res.json(results);	// Send the result as response in JSON.
		});
});


module.exports = router;
