const mongoose= require('mongoose')

const gallerySchema = new mongoose.Schema({
    galleryimage:{
        type:String,
        required:true,
    },
});
 
const gallery=mongoose.model(' gallery', gallerySchema);
module.exports=gallery;