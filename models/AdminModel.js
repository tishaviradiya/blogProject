const mongoose = require('mongoose');

const imgPath = "/uploads/admins";

const path = require('path');

const multer = require('multer');

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type :String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    status: {
        type : Boolean,
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

AdminSchema.statics.uploadImage = multer({storage : stData }).single('image');
AdminSchema.statics.iPath = imgPath;


const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;