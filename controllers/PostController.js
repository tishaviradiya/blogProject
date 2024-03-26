const PostModel = require('../models/PostModel');
const moment = require('moment');

module.exports.add_post  = (req,res) =>{
    return res.render('add_post')
}


module.exports.insertPostData = async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = PostModel.postImg+"/"+req.file.filename;
        }
        req.body.postimage=img;
        req.body.username = req.user.name;
        req.body.created_date = moment().format('LLL');
        let postdata = await PostModel.create(req.body);
        if(postdata){
            req.flash('success',"Post Added Successfully");
            return res.redirect('back');
        }
        else{
            req.flash('error',"Something wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        req.flash('error','Something wrong');
        return res.redirect('back');
    }
}