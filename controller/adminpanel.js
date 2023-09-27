const cloudinary = require('../util/cloudinary');
const banner = require('../models/homebanner');
const blog = require('../models/blogs');
const gallery = require('../models/gallery');
const contact = require('../models/contact');
const userlogin = require('../models/userlogin');
const booking = require('../models/booking');
const service = require('../models/service');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

module.exports={

    GetHomeBanner: async(req,res)=>{
        try{
        const banners= await banner.find()
        res.render('admin/banner',{layout:"adminlayout",banners})
        }catch(err){
            console.log(err);
        }
    },
    AddHomeBanner:async(req,res)=>{
        try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageurl = result.url
        const {bannerhead1,bannerhead2}=req.body;
        await banner.create({bannerhead1,bannerhead2,bannerimage:imageurl});
        console.log("home banner Added sucessfully");
        res.redirect('/admin/banner');
        }catch(err){
            console.log(err);
        }
    },
    UpdatedHomeBanner: async(req,res)=>{
      try{
        const{id}=req.params;
        const{bannerhead1,bannerhead2}= req.body;
        let imageurl=null;

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path);
            imageurl=result.url;
        }
        const updatedFields= {};

        if(bannerhead1){
            updatedFields.bannerhead1=bannerhead1;
        }
        if(bannerhead2){
            updatedFields.bannerhead2=bannerhead2;
        }
        if(imageurl){
            updatedFields.bannerimage = imageurl;
        }

        const updatedBanner = await banner.findOneAndUpdate(
            {_id:id},
            {$set:updatedFields},
            {new:true}
        );
        console.log("Home Bannber updated ...");
        res.redirect('/admin/banner')
      }catch(err){
        console.log(err);
      }
    },
    DeleteBanner:async(req,res)=>{
        try{
            const {id}=req.params;
            await banner.findByIdAndDelete({_id:id});
            console.log(' Banner Deleted Sucessfully');
            res.redirect('/admin/banner')
        }catch(err){
            console.log(err)
        }
    },

    GetBlog: async(req,res)=>{
        try{
        const blogs= await blog.find()
        res.render('admin/blog',{layout:"adminlayout",blogs})
        }catch(err){
            console.log(err);
        }
    },
    AddBlog:async(req,res)=>{
        try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageurl = result.url
        const {blogdate,bloghead,blogdescription}=req.body;
        await blog.create({blogdate,bloghead,blogdescription,blogimage:imageurl});
        console.log("blog  Added sucessfully");
        res.redirect('/admin/blog');
        }catch(err){
            console.log(err);
        }
    },
    UpdatedBlog: async(req,res)=>{
      try{
        const{id}=req.params;
        const {blogdate,bloghead,blogdescription}=req.body;
        let imageurl=null;

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path);
            imageurl=result.url;
        }
        const updatedFields= {};

        if(blogdate){
            updatedFields.blogdate=blogdate;
        }
        if(bloghead){
            updatedFields.bloghead=bloghead;
        }
        if(blogdescription){
            updatedFields.blogdescription=blogdescription;
        }
        if(imageurl){
            updatedFields.blogimage = imageurl;
        }

        const updatedBlog = await blog.findOneAndUpdate(
            {_id:id},
            {$set:updatedFields},
            {new:true}
        );
        console.log("blog updated ...");
        res.redirect('/admin/blog')
      }catch(err){
        console.log(err);
      }
    },
    DeleteBlog:async(req,res)=>{
        try{
            const {id}=req.params;
            await blog.findByIdAndDelete({_id:id});
            console.log(' Blog Deleted Sucessfully');
            res.redirect('/admin/blog')
        }catch(err){
            console.log(err)
        }
    },

    Getgallery: async(req,res)=>{
        try{
        const gallerys= await gallery.find()
        res.render('admin/gallery',{layout:"adminlayout",gallerys})
        }catch(err){
            console.log(err);
        }
    },
    Addgallery:async(req,res)=>{
        try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageurl = result.url
        await gallery.create({galleryimage:imageurl});
        console.log("gallery  Added sucessfully");
        res.redirect('/admin/gallery');
        }catch(err){
            console.log(err);
        }
    },
    Updatedgallery: async(req,res)=>{
      try{
        const{id}=req.params;
        let imageurl=null;

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path);
            imageurl=result.url;
        }
        const updatedFields= {};

     
        if(imageurl){
            updatedFields.galleryimage = imageurl;
        }

        const updatedBlog = await gallery.findOneAndUpdate(
            {_id:id},
            {$set:updatedFields},
            {new:true}
        );
        console.log("gallery updated ...");
        res.redirect('/admin/gallery')
      }catch(err){
        console.log(err);
      }
    },
    Deletegallery:async(req,res)=>{
        try{
            const {id}=req.params;
            await gallery.findByIdAndDelete({_id:id});
            console.log(' gallery Deleted Sucessfully');
            res.redirect('/admin/gallery')
        }catch(err){
            console.log(err)
        }
    },

    Getcontact: async(req,res)=>{
        try{
        const contacts= await contact.find()
        res.render('admin/contact',{layout:"adminlayout",contacts})
        }catch(err){
            console.log(err);
        }
    },
    Addcontact:async(req,res)=>{

        try{
            const {name,email,subject,number,message}=req.body
          
        await contact.create({name,email,subject,number,message});
        await SendmailTransport.sendMail({
            from:'<EMAIL>', // sender address
            to:`${process.env.GMAIL}`,// list of receivers
            subject : `${subject}`,
            html: ` <h1>Name:${name}</h1><br/>
            Email:${email}<br/><br/>
            Subject:${subject}<br/><br/>  Number:${number}<br/><br/> Message:<p>${message}</p>`
            
        })
        console.log("contact send and saved sucessfully");
    res.redirect('/')
        }catch(err){ 
            console.log(err);
        }
    },


    
    Deletecontact:async(req,res)=>{
        try{
            const {id}=req.params;
            await contact.findByIdAndDelete({_id:id});
            console.log(' contact Deleted Sucessfully');
            res.redirect('/admin/contact')
        }catch(err){
            console.log(err)
        }
    },
    Getuserdetail:async(req,res)=>{
        try{
            const user= await userlogin.find()
            res.render("admin/userdetails",{layout:"adminlayout",user})
        }catch(err){
            console.log(err);
        }
    },
    getbooking:async(req,res)=>{
        try{
            const bookings= await booking.find()
            res.render('admin/booking',{layout:'adminlayout',bookings})
        }catch(err){
        console.log(err);
        }
    },
    Postbooking:async(req,res)=>{
        try{
            console.log('fdessssssssssssssssssssssssgjcdsjhfgbdjhfbdjhvdsafhdvfmhdbfhdbjdv');
            const {from,destination,box,name,number,email,details}=req.body
            console.log(req.body,"feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            await booking.create({from,destination,box,name,number,email,details})
            console.log('cargo booking recieved');
            res.redirect('/' )
        }catch(err){
            console.log(err);
        }
    },

    Getservice: async(req,res)=>{
        try{
        const services= await service.find()
        res.render('admin/service',{layout:"adminlayout",services})
        }catch(err){
            console.log(err);
        }
    },
    Addservice:async(req,res)=>{
        try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageurl = result.url
        const {servicehead,servicedescription}=req.body;
        await service.create({servicehead,servicedescription,serviceimage:imageurl});
        console.log("service Added sucessfully");
        res.redirect('/admin/service');
        }catch(err){
            console.log(err);
        }
    },
    Updatedservice: async(req,res)=>{
      try{
        const{id}=req.params;
        const {servicehead,servicedescription}=req.body;
        let imageurl=null;

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path);
            imageurl=result.url;
        }
        const updatedFields= {};

       
        if(servicehead){
            updatedFields.servicehead=servicehead;
        }
        if(servicedescription){
            updatedFields.servicedescription=servicedescription;
        }
        if(imageurl){
            updatedFields.serviceimage = imageurl;
        }

        const updatedservice = await service.findOneAndUpdate(
            {_id:id},
            {$set:updatedFields},
            {new:true}
        );
        console.log("service updated ...");
        res.redirect('/admin/service')
      }catch(err){
        console.log(err);
      }
    },
    Deleteservice:async(req,res)=>{
        try{
            const {id}=req.params;
            await service.findByIdAndDelete({_id:id});
            console.log(' service Deleted Sucessfully');
            res.redirect('/admin/service')
        }catch(err){
            console.log(err)
        }
    },

}