const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const MYSQL = require('../models/mysql');

// Private and public key pair
const PRIVATE_KEY_FILE = __dirname + "/../private-key.key";
const PUBLIC_KEY_FILE = __dirname + "/../public-key.key";

// DEBUG
var DEBUG_MODE = true;

// JWT claims:
var issuer = "jumppack"
var expiresIn = "12h";  // Time before JWT expirary
var algorithm = "RS256"; // Algorithm used for private/public key pair

/* Send signed JWT once user successfully authenticated */
router.get("/", function(req, res, next) {
    // Grab the "Authorization" header.
    var auth = req.get("Authorization");
	console.log(auth);
    // On the first request, the "Authorization" header won't exist, so we'll set a Response
    // header that prompts the browser to ask for a username and password.
	if (auth) {
        // If the user enters a username and password, the browser re-requests the route
        // and includes a Base64 string of those credentials.
        // NOTE: overflow
        var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
        var username = credentials[0];
        var password = credentials[1];

        // Check if username and password matches in the database.
        var db = new MYSQL();
        db.getUserData(username, (result) => {
            if (!result || result.length == 0) {
                res.status(401).send("Access denied");
                return;
            }

            if (DEBUG_MODE){
                console.log("Username: " + username);
                console.log("Password: " + password);
                console.log("MySQL Username: " + result[0].user_name);
                console.log("MySQL Password: " + result[0].user_password);
            }

            if (result[0].user_name === username && result[0].user_password === password) {
                var privateKEY = fs.readFileSync(PRIVATE_KEY_FILE, 'utf8');
                var token = jwt.sign({username: username}, privateKEY, {issuer: issuer, expiresIn: expiresIn, algorithm: algorithm});
                res.status(200).send(token);

                if (DEBUG_MODE){
                    console.log("JWT generated: " + token);
                }
            } else {
                res.status(401).send("Access denied!");
            }
        });

        // close database connection
        db.end();
	} else {
		res.status(401).send();
    }
});

/* HTTP POST /api/session */
router.post("/", function (req, res, next){

    var auth = req.get("authorization");
    if (!auth) {
        res.status(401).send("Authorization required");
        return false;
    }
    auth = auth.split(" ");
    var authType = auth[0];

    // check if auth header is bearer type
    // return 401 if not.
    if (authType != "Bearer") {
        res.status(401).send("Incorrect authorization type");
        return false;
    }

    // JWT token part
    var jwtToken = auth[1];
    if (DEBUG_MODE){
        console.log("JWT: " + jwtToken);
    }

    var publicKEY = fs.readFileSync(PUBLIC_KEY_FILE, 'utf8');
    var legit = jwt.verify(jwtToken, publicKEY, {issuer: issuer, expiresIn: expiresIn, algorithm: algorithm}, (err, decoded) => {
        // If Jwt is invalid or incorrect:
        if (err){
            res.status(401).send("Access denied");
        } else{
            // jwt is valid - send decoded json object.
            res.json(decoded);
        }
    });

});
module.exports = router;
