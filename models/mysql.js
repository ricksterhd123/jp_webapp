'use strict';

const mysql = require('mysql');
// database config
const config = require('./config.js')
const connection = mysql.createConnection(config.mysql);
// TODO: Store data in memory or some type of cache and provide an interface to the MySQL connection.
connection.connect();

/**
 * @desc Get list of games by id
 * @param integer id - The game id to search for
 * @param function callback(object games) - The callback to obtain the result.
 * @return bool - success or failure
 */
module.exports.listGames = (id, callback) => {
    let query = 'SELECT * FROM test';
    if (id) {
        query += ' WHERE userid = ' + connection.escape(id);
    }

    connection.query(query, function(err, results) {
        if (err) {
            throw err;
        }
        console.log(JSON.stringify(results));
        console.log(callback);
        callback(results);
    });
}
