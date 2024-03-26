const CategoryModel = require('../models/CategoryModel');
const moment = require('moment');

module.exports.add_category = async (req,res) =>{
    return res.render('add_category');
}

module.exports.insertCategoryData = async (req,res) =>{
    try{
        console.log(req.body);
        req.body.status  = true;
        req.body.created_date = moment().format("LLL");
        let catdata = await CategoryModel.create(req.body);
        if(catdata){
            req.flash('success',"Category Added");
            return res.redirect('back');
        }
        else{
            req.flash('error',"Something wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }
}