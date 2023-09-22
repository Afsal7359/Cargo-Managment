const mongoose = require('mongoose');

const userloginSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
});
const userlogin = mongoose.model('userlogin', userloginSchema);
module.exports=userlogin;