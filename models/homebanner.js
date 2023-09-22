const mongoose= require('mongoose')

const BannerSchema = new mongoose.Schema({
    bannerhead1:{
        type:String,
        required:true,
        trim:true
    },
    bannerhead2:{
        type:String,
        required:true,
        trim:true
    },
    bannerimage:{
        type:String,
        required:true,
    },
});
 
const banner=mongoose.model('Home banner', BannerSchema);
module.exports=banner;