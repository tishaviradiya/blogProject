const moment = require('moment');
const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');

module.exports.add_subcategory = async (req,res) =>{
    try{
        let catData = await CategoryModel.find({status:true});
        return res.render('add_subcategory',{
             catData
        });

    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.insertSubcategoryData = async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = SubcategoryModel.subcategoryImg+"/"+req.file.filename;
        }
        req.body.subcategoryimage = img;
        req.body.status = true;
        req.body.created_date = moment().format('LLL');
        let subcat = await SubcategoryModel.create(req.body);
        if(subcat){
            req.flash("success","Subcategory Added");
            return res.redirect('back');
        }
        else{
            console.log(err);
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.view_subcategory = async (req,res) =>{
    try{
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }
       
        var page=0;
        var per_page=3;
    
        let allRecord = await SubcategoryModel.find({
            $or : [
                {title : {$regex: search, $options:"i"}},
                {description : {$regex: search, $options:"i"}},
            ]
        }).countDocuments();
        let totalPage = Math.ceil(allRecord/per_page)
        
        if(req.query.page){
            page=req.query.page
        }
    
        let SubcatData = await SubcategoryModel.find({
            $or : [
                {title : {$regex: search, $options:"i"}},
                {description : {$regex: search, $options:"i"}},
            ]
        })
        .skip(page*per_page)
        .limit(per_page).populate('categoryId').exec();

        console.log(SubcatData);
    
        return res.render('view_subcategory',{
            SubcatData : SubcatData,
            search : search,
            totalPage :totalPage,
            currentPage : page,
            per_page : per_page
        });
    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }
}