const mongoose= require('mongoose')

const blogSchema = new mongoose.Schema({
    blogdate:{
        type:String,
        required:true,
        trim:true
    },
    bloghead:{
        type:String,
        required:true,
        trim:true
    },
    blogdescription:{
        type:String,
        require:true,
        trim:true
    },
    blogimage:{
        type:String,
        required:true,
    },
});
 
const blog=mongoose.model(' blog', blogSchema);
module.exports=blog;