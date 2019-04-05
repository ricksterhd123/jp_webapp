'use strict';

const mysql = require('mysql');
// database config
const config = require('./config.js')
const MAX_INT = 2147483647;

// const connection = mysql.createConnection(config.mysql);
// // TODO: Store data in memory or some type of cache and provide an interface to the MySQL connection.
// connection.connect();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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

    // Get all game names
    listGamesNames(callback) {
      if (!this.connection) return false;

      let query = 'SELECT game_name FROM Games';

      this.connection.query(query, function(err, results) {
          if (err) throw err;
          callback(results);
      });

      return true;
    }

    // get user account details
    getUserData(username, callback){
        if (!this.connection) return false;
        let query = "SELECT * FROM User_Account WHERE user_name = " + this.connection.escape(username);

        this.connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results);
        })
        return true;
    }

    // get user account details
    getUserDataFromID(user_id, callback){
        if (!this.connection) return false;
        let query = "SELECT * FROM User_Account WHERE user_id = " + this.connection.escape(user_id);

        this.connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results);
        })
        return true;
    }

    // add user account
    addUserData(username, password, email, callback){
        if (!this.connection) return false;
        // // create a random ID value because i cannot for the life of me get AUTO_INCREMENT working on user_id ... foreign key constrains etc
        // let user_id = getRandomInt(MAX_INT - 1);
        // console.log(user_id);
        // let duplicate = true;
        //
        // // No time = hack
        // while (duplicate) {
        //     getUserDataFromID(user_id, (results) => {
        //         duplicate = results.length > 0;
        //         user_id = getRandomInt(MAX_INT - 1); // -1 for good luck and good marks...
        //     });
        //     console.log(user_id);
        // }

        // Now add the user into the database.
        let query = "INSERT INTO User_Account (`user_id`, `user_name`, `user_email`, `user_password`) VALUES ( NULL, " +  this.connection.escape(username) + ", " + this.connection.escape(email) + ", " + this.connection.escape(password) + ")";

        this.connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results);
        })
        return true;
    }
}

module.exports = MYSQL;
