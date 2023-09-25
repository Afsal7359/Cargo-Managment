const mongoose= require('mongoose')

const bookingSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
        trim:true
    },
    destination:{
        type:String,
        trim:true,
        required:true,
    },
    box:{
        type:Number,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:Number,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    details:{
        type:String,
         required:true,
        trim:true
    },
});
 
const booking=mongoose.model('booking', bookingSchema);
module.exports=booking;