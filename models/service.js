const mongoose= require('mongoose')

const serviceSchema = new mongoose.Schema({

    servicehead:{
        type:String,
        required:true,
        trim:true
    },
    servicedescription:{
        type:String,
        require:true,
        trim:true
    },
    serviceimage:{
        type:String,
        required:true,
    },
});
 
const service=mongoose.model(' service', serviceSchema);
module.exports=service;