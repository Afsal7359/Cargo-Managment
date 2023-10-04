var express = require('express');
const usercontroller = require('../controller/usercontroller');
var router = express.Router();

/* GET users listing. */
router.get('/',usercontroller.Userhome)

router.post('/userregister', usercontroller.userregister);

router.get('/userlogin',usercontroller.loginpage);

router.post('/userlogin',usercontroller.userlogin);

router.get('/logout',usercontroller.userLogout);

router.get('/about',usercontroller.userAbout);

router.get('/service',usercontroller.userService);

router.get('/contact',usercontroller.userContact);

router.get('/gallery',usercontroller.usergallery);

router.get('/blog',usercontroller.userBlog);

router.get('/user',usercontroller.userinfo);

router.get('/servicedetail/:id',usercontroller.servicedetail);


module.exports = router;
