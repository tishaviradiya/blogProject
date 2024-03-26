const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const sliderPath = "/uploads/sliders";

const SliderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    link: {
        type : String,
        required : true
    },
    sliderimage : {
        type : String,
        required : true
    },
    status: {
        type : Boolean,
        required : true
    }
})


const st = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',sliderPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

SliderSchema.statics.sliderUploads = multer({storage : st}).single('sliderimage');
SliderSchema.statics.sliderImg = sliderPath;

const Slider = mongoose.model("Slider",SliderSchema);

module.exports = Slider;


