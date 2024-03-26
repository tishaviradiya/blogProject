const Other = require('../models/OtherModel');

module.exports.add_others = async (req,res) =>{
    //  console.log("Others")
    return res.render("add_others");
}

module.exports.insertOtherData = async (req,res) =>{
    console.log(req.body);
    let others = await Other.create(req.body);
    req.flash("success","Other saying data added");
    return res.redirect('back');
}

module.exports.view_others = async (req,res) =>{
    let otherData = await Other.find();
    if(otherData){
        return res.render('view_others',{
            otherData : otherData
        })
    }
}