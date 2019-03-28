/*
 * Connects to a MySQL database to send info on GET request.
 */

const express = require('express');
const router = express.Router();
const db = require('../models/mysql');

router.get('/', function(req, res, next) {
	const query = "SELECT * FROM test";
	const id = req.query.game;
	if (id){ query = query + " WHERE userid = " + connection.escape(id); }
	db.listGames(req.query.game, (games) => {res.json(games);});
});
module.exports = router;
