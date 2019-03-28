'use strict';

const mysql = require('mysql');
// database config
const config = require('./config.js')
const connection = mysql.createConnection(config.mysql);
// TODO: Store data in memory or some type of cache and provide an interface to the MySQL connection.
connection.connect();

module.exports.listGames = (id, callback) => {
  let query = 'SELECT * FROM test';
  if (id) {
    query += 'WHERE userid = ' + connection.escape(id);
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
