const express = require('express');
const router = express.Router();
const MYSQL = require('../models/mysql');

router.get("/", function(req, res, next){
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
    if (credentials[0] === "username" && credentials[1] === "password") {
      // The username and password are correct, so the user is authorized.
      return res.send("Access Granted!");
    } else {
      // The user typed in the username or password wrong.
      return res.status(401).send("Access Denied (incorrect credentials)");
    }
  }

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
