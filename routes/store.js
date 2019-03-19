/* 
 * Connects to a MySQL database to send info on GET request.
 */

var express = require('express');
var router = express.Router();
// MySQL nodejs module from: https://www.npmjs.com/package/mysql
var mysql = require('mysql');
// Create a connection to MySQL server
var connection = mysql.createConnection({host: 'remotemysql.com', user: 'dXrzjYnA8J', password: 'BbLqTSU7vL', database: 'dXrzjYnA8J'});
// Connect
// TODO: Store data in memory or some type of cache and provide an interface to the MySQL connection. 
connection.connect();

/* GET store games */
router.get('/', function(req, res, next) {
	var id = req.query.id;
	if (!id){ res.status(404).send('Error: no id specified'); return; }
	// TODO: Create a games table and replace this test code and return some useful data.
	connection.query("SELECT username FROM test WHERE userid = 1", 
		function (error, results, fields) { 
			if (error){ console.log("MYSQL ERROR"); return; };
			res.json(results);
		});
});


module.exports = router;
