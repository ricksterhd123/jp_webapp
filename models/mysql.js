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
     * @param string search - The game title to search for
     * @param function callback(JSON games) - The callback which obtains the result.
     * @return bool - success or failure connection
     */
    listGames(id, search, callback) {
        if (!this.connection) return false;

        let query = 'SELECT * FROM Games';

        if (id) {
            query += ' WHERE game_id = ' + this.connection.escape(id);
        }

        if (search) {
            query += (id) ? " AND" : " WHERE";    // TODO: find a better way to do this.
            query += " game_name = " + this.connection.escape(search);
        }

        console.log(query);
        this.connection.query(query, function(err, results) {
            if (err) throw err;
            callback(results);
        });

        return true;
    }

    getUserData(username, callback){
        if (!this.connection) return false;
        let query = "SELECT * FROM User_Account WHERE user_name = " + this.connection.escape(username);

        this.connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results);
        })
        return true;
    }
}

module.exports = MYSQL;
