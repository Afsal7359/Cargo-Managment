var express = require('express');
const admincontroller = require('../controller/admincontroller');
var router = express.Router();
const upload = require('../util/multer');
const adminauth  = require('../middlewears/Adminauth');
const adminpanel = require('../controller/adminpanel');
const sendmail = require('../controller/sendmail')

/* GET home page. */
router.get('/', adminauth.adminauth,admincontroller.admindashboard);
router.post('/login',admincontroller.PostLogin);
router.get('/login',admincontroller.GetLogin);
router.get('/logout',adminauth.adminauth,admincontroller.AdminLogout)

//Home Banner
router.get('/banner',adminauth.adminauth,adminpanel.GetHomeBanner);
router.post('/addbanner',upload.single('bannerimage'),adminauth.adminauth,adminpanel.AddHomeBanner);
router.post('/editbanner/:id',upload.single("bannerimage"),adminauth.adminauth,adminpanel.UpdatedHomeBanner);
router.get('/deletebanner/:id',adminauth.adminauth,adminpanel.DeleteBanner);

//blog page
router.get('/blog',adminauth.adminauth,adminpanel.GetBlog);
router.post('/addblog',upload.single('blogimage'),adminauth.adminauth,adminpanel.AddBlog);
router.post('/editblog/:id',upload.single("blogimage"),adminauth.adminauth,adminpanel.UpdatedBlog);
router.get('/deleteblog/:id',adminauth.adminauth,adminpanel.DeleteBlog);

//gallery page
router.get('/gallery',adminauth.adminauth,adminpanel.Getgallery);
router.post('/addgallery',upload.single('galleryimage'),adminauth.adminauth,adminpanel.Addgallery);
router.post('/editgallery/:id',upload.single("galleryimage"),adminauth.adminauth,adminpanel.Updatedgallery);
router.get('/deletegallery/:id',adminauth.adminauth,adminpanel.Deletegallery);

//contact page
router.get('/contact',adminauth.adminauth,adminpanel.Getcontact);
router.post('/contactform',sendmail.addContact);
router.get('/deletecontact/:id',adminauth.adminauth,adminpanel.Deletecontact);

//get user details
router.get('/user',adminauth.adminauth,adminpanel.Getuserdetail);

//get cargo booking
router.get('/booking',adminauth.adminauth,adminpanel.getbooking);
router.post('/cargobooking',adminpanel.Postbooking);

//blog page
router.get('/service',adminauth.adminauth,adminpanel.Getservice);
router.post('/addservice',upload.single('serviceimage'),adminauth.adminauth,adminpanel.Addservice);
router.post('/editservice/:id',upload.single("serviceimage"),adminauth.adminauth,adminpanel.Updatedservice);
router.get('/deleteservice/:id',adminauth.adminauth,adminpanel.Deleteservice);

module.exports = router;
