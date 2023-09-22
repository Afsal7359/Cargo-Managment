var express = require('express');
const admincontroller = require('../controller/admincontroller');
var router = express.Router();
const upload = require('../util/multer');
const adminpanel = require('../controller/adminpanel')
// const adminauth  = require('../middilewears/Adminauth');


/* GET home page. */
router.get('/', admincontroller.admindashboard);

//Home Banner
router.get('/banner',adminpanel.GetHomeBanner);
router.post('/addbanner',upload.single('bannerimage'),adminpanel.AddHomeBanner);
router.post('/editbanner/:id',upload.single("bannerimage"),adminpanel.UpdatedHomeBanner);
router.get('/deletebanner/:id',adminpanel.DeleteBanner);


module.exports = router;
