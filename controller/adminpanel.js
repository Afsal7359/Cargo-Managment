const cloudinary = require('../util/cloudinary');
const banner = require('../models/homebanner');

module.exports={

    GetHomeBanner: async(req,res)=>{
        try{
        const banners= await banner.find()
        res.render('admin/home/banner',{layout:"adminlayout",banners})
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
}