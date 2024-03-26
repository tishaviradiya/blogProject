
const SliderModel = require('../models/SliderModel');

module.exports.add_slider =async (req,res) =>{
    return res.render('add_slider');
}

module.exports.insertSliderData = async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = SliderModel.sliderImg+"/"+req.file.filename;
        }
        req.body.sliderimage = img;
        req.body.status = true;
        console.log(req.body);
        let sliderData = await SliderModel.create(req.body);
        if(sliderData){
            req.flash("success","Slider Data inserted")
            return res.redirect('back');
        }
        else{
            req.flash("error","something wrong")
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash("error","something wrong")
        return res.redirect('back');
    }
}


module.exports.view_slider = async (req,res) =>{
    let sliderData = await SliderModel.find();
    if(sliderData){
        return res.render("view_slider",{
            sliderData : sliderData
        })

    }
}


module.exports.deactive = async (req,res) =>{
    let sliderDeactive= await SliderModel.findByIdAndUpdate(req.params.id,{status:false});
    if(sliderDeactive){
        req.flash('success',"Deactive");
        return res.redirect('back');
    }
}


module.exports.active = async (req,res) =>{
    let sliderDeactive= await SliderModel.findByIdAndUpdate(req.params.id,{status:true});
    if(sliderDeactive){
        req.flash('success',"Active");
        return res.redirect('back');
    }
}