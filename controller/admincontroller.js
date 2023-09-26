const adminlogin = require("../models/admin");


module.exports={

    admindashboard:async(req,res)=>{
        try{
            res.render('admin/dashboard',{layout:"adminlayout"})
        }catch(err){
            console.log(err);
        }
    },
    GetLogin: async (req, res) => {
        try {
            if (req.session.adminloggedIn) {
                res.redirect('/admin')
            } else {
                res.render('admin/login', { layout: "adminlayout", adminlogin: true,adminlogErr:req.session.admlogErr });
                req.session.admlogErr=false;
            }
        } catch (err) {
            console.log(err);
            // Handle the error appropriately, such as sending an error response to the client
        }
    },
    PostLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            const loginadmin = await adminlogin.findOne({ email });
            if (!loginadmin) {
                // res.render('admin/login', { layout: "adminlayout", adminlogin: true });
                req.session.admlogErr = "email does not exist....";
                res.redirect('/admin/login')
            }
            let passwordCorrect
            if(password===loginadmin.password){
                passwordCorrect=true
            }else{
                passwordCorrect=false
            }
            // const passwordCorrect = await bcrypt.compare(password, loginadmin.password);
            if (!passwordCorrect) {
                // res.render('admin/login', { layout: "adminlayout", adminlogin: true });
                req.session.admlogErr = "incorrect password....";
                res.redirect('/admin/login')
            } else {
                req.session.admin = email;
                req.session.adminloggedIn = true;
                req.session.admlogErr=false;
                res.redirect('/admin')
            }
    
    
    
    
        } catch (err) {
            console.log(err);
            // Handle the error appropriately, such as sending an error response to the client
        }
    },
    AdminLogout: async (req, res) => {
        try {
            req.session.adminloggedIn = false;
            res.redirect('/admin/login')
        } catch (err) {
            console.log(err);
        }
    
    },
    

}

