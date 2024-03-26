const SliderModel = require('../models/SliderModel');
const OtherModel = require('../models/OtherModel');
const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');
const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const moment = require('moment');

module.exports.home = async (req,res) =>{
    let sliderData = await SliderModel.find({status:true});
    let otherData = await OtherModel.find();
    let postdata = await PostModel.find();
    return res.render('userPanel/home',{
        sliderData : sliderData,
        otherData : otherData,
        postdata : postdata
    });
}


module.exports.blogsingle = async (req,res) =>{
    // console.log(req.params.id);


    //start Next and Prev Logic
    let allIds = await PostModel.find({}).select('_id');
    let current;
    allIds.map((v,i)=>{
        if(v._id == req.params.id){
            current = i;
        }
    })
    //End

    // let ids = [];
    // allIds.map((v,i)=>{
    //     ids[i] = v.id
    // })
    // console.log(ids);

    let postSingleData = await PostModel.findById(req.params.id);

    // start comment Logic
        //  let commentCount =await CommentModel.find({postId:req.params.id}).countDocuments();
         let commentData = await CommentModel.find({postId:req.params.id});
         
    //end 


    //recent post logic
        let postData = await PostModel.find({}).sort({_id:-1}).limit(3);
        
    //end

    if(postSingleData){
        return res.render('userPanel/blogSingle',{
            postSingleData,
            allIds : allIds,
            pos : current,
            commentData : commentData,
            postData 
        })
    }
    else{
        return res.redirect('back');
    }
}


module.exports.addPostComment = async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = CommentModel.iPath+"/"+req.file.filename;
        }
        req.body.commentImage = img;
        req.body.status = true;
        req.body.created_date = moment().format("LLL");
        let coData = await CommentModel.create(req.body);
        if(coData){
            req.flash('success',"Comment Added")
            return res.redirect('back');

        }
        else{
            req.flash('error',"Something wrong")
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.workThreeColumns = async (req,res) =>{
     try{
         let categoryData = await CategoryModel.find({});
         let subcat = await SubcategoryModel.find({});
         return res.render('userPanel/work-three-columns',{
            catData : categoryData,
            subcat : subcat
         });
     }
     catch(err){
        console.log(err);
        return res.redirect('back');
     }
}