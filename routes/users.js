const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Hello world").status(203);
});

router.put('/', function(req, res, next) {
    res.send("todo").status(404);
});
module.exports = router;
