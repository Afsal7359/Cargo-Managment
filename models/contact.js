const mongoose= require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    subject:{
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:Number,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
});
 
const contact=mongoose.model('contact', contactSchema);
module.exports=contact;