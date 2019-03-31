const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const MYSQL = require('../models/mysql');

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

            console.log("Username: " + username);
            console.log("Password: " + password);
            console.log("Result: " + result[0].username);
            console.log("Result: " + result[0].password);
            if (result[0].username == username && result[0].password == password) {
                res.send("Access granted!");
            } else {
                res.status(401).send("Access denied!");
            }
        });

        // close database connection
        db.end();
    }
});
module.exports = router;
