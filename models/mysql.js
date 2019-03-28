'use strict';

const mysql = require('mysql');
// database config
const config = require('./config.js')
// const connection = mysql.createConnection(config.mysql);
// // TODO: Store data in memory or some type of cache and provide an interface to the MySQL connection.
// connection.connect();

class MYSQL{
    constructor(){
        this.connect();
    }

    // Connect to mysql database
    connect() {
        this.connection = mysql.createConnection(config.mysql);
        this.connection.connect();
    }

    // End connection
    end() {
        this.connection.end();
        this.connection = null;
    }

    /**
     * @desc Get list of games by id
     * @param integer id - The game id to search for
     * @param function callback(object games) - The callback to obtain the result.
     * @return bool - success or failure
     */
    listGames(id, callback) {
        if (!this.connection) return false;

        let query = 'SELECT * FROM test';
        if (id) {
            query += ' WHERE userid = ' + this.connection.escape(id);
        }

        this.connection.query(query, function(err, results) {
            if (err) {
                throw err;
            }
            callback(results);
        });

        return true;
    }

}


module.exports = MYSQL;
