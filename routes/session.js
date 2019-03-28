const express = require('express');
const router = express.Router();
const MYSQL = require('../models/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Hello world").status(203);
});

/* POST to session with credentials */

/* TODO: https://www.npmjs.com/package/express-basic-auth
The body of POST the request will contain username and password data but
I think we should use the Authorization header instead.
*/
router.post('/', function(req, res){
    console.log("Username: " + req.body.username);
    console.log("Password: " + req.body.password);

    let db = new MYSQL();
    db.getUserData(req.body.username, (result) => {
        if (result[0].password == req.body.password){
            console.log("Success!");
            res.send("Success!").status(203);
        }else {
            res.send("Error").status(404);
        }
    });
})

module.exports = router;
