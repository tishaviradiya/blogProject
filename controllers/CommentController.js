let CommentModel = require('../models/CommentModel');

module.exports.view_comments = async (req,res) =>{
    try{
        
        var search = '';
    if(req.query.search){
        search = req.query.search;
    }
   
    var page=0;
    var per_page=3;

    let CommentCount = await CommentModel.find({
        $or : [
            {name : {$regex: search, $options:"i"}},
            {email : {$regex: search, $options:"i"}},
        ]
    }).countDocuments();
    let totalPage = Math.ceil(CommentCount/per_page)
    
    if(req.query.page){
        page=req.query.page
    }

    let CommentRecord = await CommentModel.find({
        $or : [
            {name : {$regex: search, $options:"i"}},
            {email : {$regex: search, $options:"i"}},
        ]
    })
    .skip(page*per_page)
    .limit(per_page).populate('postId').exec();

    console.log(CommentRecord)

       
        if(CommentRecord){
            return res.render('view_comments',{
                CommentRecord : CommentRecord,
                search : search,
                totalPage :totalPage,
                currentPage : page,
                per_page : per_page
            })
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}