const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');


const postPath = "/uploads/posts";

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    postimage : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    created_date: {
        type : String,
        required : true
    }
})


const st = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',postPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

PostSchema.statics.postUploads = multer({storage : st}).single('postimage');
PostSchema.statics.postImg = postPath;

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;


