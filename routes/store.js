/*
 * Connects to a MySQL database to send info on GET request.
 */

const express = require('express');
const router = express.Router();
const db = require('../models/mysql');
// MySQL nodejs module from: https://www.npmjs.com/package/mysql
/**********************************     TEST FROM HERE
const mysql = require('mysql');
const connection = mysql.createConnection({host: 'remotemysql.com', user: 'dXrzjYnA8J', password: 'BbLqTSU7vL', database: 'dXrzjYnA8J'});
connection.connect();

router.get('/', function(req, res, next) {
	const query = "SELECT * FROM test";
	const id = req.query.game;
	if (id){ query = query + " WHERE userid = " + connection.escape(id); }
	connection.query(query,
		function (error, results, fields) {
			if (error){ console.log("MYSQL ERROR"); return; };
			res.json(results);
		});
});
                                       TO HERE                 ********************************/
router.get('/', sendGames);

function sendGames(req, res) {
	const games = db.listGames(req.query.game);
	// res.json(games);
	console.log(games);
}

module.exports = router;
