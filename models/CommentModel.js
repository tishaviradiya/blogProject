const mongoose = require('mongoose');

const imgPath = "/uploads/userImages";

const path = require('path');

const multer = require('multer');

const CommentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    message : {
        type : String,
        required : true
    },
    commentImage : {
        type : String,
        required : true
    },
    status: {
        type : Boolean,
        required : true
    },
    created_date:{
        type : String,
        required : true
    }
});


const stData = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, path.join(__dirname,'..',imgPath));
    },
    filename : (req,file,cb) =>{
        cb(null, file.fieldname+'-'+Date.now())
    }
})

CommentSchema.statics.uploadImage = multer({storage : stData }).single('commentImage');
CommentSchema.statics.iPath = imgPath;


const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;