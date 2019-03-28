/*
 * Connects to a MySQL database to send info on GET request.
 */

const express = require('express');
const router = express.Router();
const MYSQL = require('../models/mysql');

router.get('/', (req, res, next) => {
	let db = new MYSQL();
	db.listGames(req.query.game, (games) => {res.json(games);});
});
module.exports = router;
