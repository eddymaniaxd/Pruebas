var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log('eddymania');
    res.status(201).json(
        {"name": "joaquin chumacero" }
       );
     
});

module.exports = router;