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
    var auth = req.get("authorization");

    // On the first request, the "Authorization" header won't exist, so we'll set a Response
    // header that prompts the browser to ask for a username and password.
    if (!auth) {
        res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
        // If the user cancels the dialog, or enters the password wrong too many times,
        // show the Access Restricted error message.
        return res.status(401).send("Authorization Required");
    } else {
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
                res.status(401).send("Access denied")
                return;
            }

            if (DEBUG_MODE){
                console.log("Username: " + username);
                console.log("Password: " + password);
                console.log("MySQL Username: " + result[0].username);
                console.log("MySQL Password: " + result[0].password);
            }

            if (result[0].username === username && result[0].password === password) {
                var privateKEY = fs.readFileSync(PRIVATE_KEY_FILE, 'utf8');
                var token = jwt.sign({username: username}, privateKEY, {issuer: issuer, expiresIn: expiresIn, algorithm: algorithm});
                console.log("Token - " + token)
                res.send(token);

            } else {
                res.status(401).send("Access denied!");
            }
        });

        // close database connection
        db.end();
    }
});

/* HTTP POST /api/session */
router.post("/", function (req, res, next){
    if (DEBUG_MODE){
        console.log("JWT: " + req.body.token);
    }

    var publicKEY = fs.readFileSync(PUBLIC_KEY_FILE, 'utf8');
    var legit = jwt.verify(req.body.token, publicKEY, {issuer: issuer, expiresIn: expiresIn, algorithm: algorithm}, (err, decoded) => {
        // If Jwt is invalid or incorrect:
        if (err){
            res.status(401).send("Invalid jwt");
        } else{
            // jwt is valid - send decoded json object.
            res.json(decoded);
        }
    });

});
module.exports = router;
