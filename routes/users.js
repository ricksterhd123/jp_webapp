const express = require('express');
const router = express.Router();
const MYSQL = require('../models/mysql')
function validateUsername(username) {
    return /^[0-9a-zA-Z_.-]+$/.test(username) && username.length > 4 && username.length < 50;
}

function validatePassword(pw) {

    return /[A-Z]/       .test(pw) &&
           /[a-z]/       .test(pw) &&
           /[0-9]/       .test(pw) &&
           /[^A-Za-z0-9]/.test(pw) &&
           pw.length > 4;

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Hello world").status(203);
});

router.put('/', function(req, res, next) {
    // Invalid
    if (!validateUsername(req.body.username)) { res.send("Error: Username must be between 5 and 49 characters in length.");}
    else if (!validatePassword(req.body.password)) { res.send("Error: Password must match the given criteria."); }
    else if (!validateEmail(req.body.email)) {res.send("Error: Invalid email.");}
    else {
        var db = new MYSQL();
        db.addUserData(req.body.username, req.body.password, req.body.email, (result) => { res.send("Success!") });
        db.end();
    }
});
module.exports = router;
