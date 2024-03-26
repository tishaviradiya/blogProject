const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const subPath = "/uploads/subcategory";

const SubcategorySchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
   
    subcategoryimage : {
        type : String,
        required : true
    },
    status: {
        type : Boolean,
        required : true
    },
    created_date : {
        type: String,
        required : true
    }
})


const st = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',subPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

SubcategorySchema.statics.subcategoryUploads = multer({storage : st}).single('subcategoryimage');
SubcategorySchema.statics.subcategoryImg = subPath;

const Subcategory = mongoose.model("Subcategory",SubcategorySchema);

module.exports = Subcategory;


