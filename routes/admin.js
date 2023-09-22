var express = require('express');
const admincontroller = require('../controller/admincontroller');
var router = express.Router();

/* GET home page. */
router.get('/', admincontroller.admindashboard);


module.exports = router;
