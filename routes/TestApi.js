var express = require('express');
var router = express.Router();

/* GET Api testing. */
router.get('/', function(req, res, next) {
  res.send('Testing the Api');
});

module.exports = router;