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

//blog page
router.get('/blog',adminpanel.GetBlog);
router.post('/addblog',upload.single('blogimage'),adminpanel.AddBlog);
router.post('/editblog/:id',upload.single("blogimage"),adminpanel.UpdatedBlog);
router.get('/deleteblog/:id',adminpanel.DeleteBlog);

//gallery page
router.get('/gallery',adminpanel.Getgallery);
router.post('/addgallery',upload.single('galleryimage'),adminpanel.Addgallery);
router.post('/editgallery/:id',upload.single("galleryimage"),adminpanel.Updatedgallery);
router.get('/deletegallery/:id',adminpanel.Deletegallery);

//contact page
router.get('/contact',adminpanel.Getcontact);
router.post('/contactform',adminpanel.Addcontact);
router.get('/deletecontact/:id',adminpanel.Deletecontact);

//get user details
router.get('/user',adminpanel.Getuserdetail);

//get cargo booking
router.get('/booking',adminpanel.getbooking);
router.post('/cargobooking',adminpanel.Postbooking);

//blog page
router.get('/service',adminpanel.Getservice);
router.post('/addservice',upload.single('serviceimage'),adminpanel.Addservice);
router.post('/editservice/:id',upload.single("serviceimage"),adminpanel.Updatedservice);
router.get('/deleteservice/:id',adminpanel.Deleteservice);

module.exports = router;
