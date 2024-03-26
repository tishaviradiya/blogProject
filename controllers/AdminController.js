const Admin = require('../models/AdminModel');

const path= require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');

module.exports.login = async (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard');
    }
    else{
        return res.render("login");
    }
}

module.exports.signIn = async (req,res) =>{
   try{
    req.flash('success','Login Successfully');

    
    return res.redirect('/admin/dashboard');
   }
   catch(err){
    return res.redirect('back');
   }
}

module.exports.dashboard = async (req,res) =>{
    console.log(req.user)
    
    return res.render('dashboard');
}

module.exports.profile = async (req,res) =>{
    return res.render('profile');
}


module.exports.addAdmin = async (req,res) =>{
   
    return res.render('add_admin');
}

module.exports.viewAdmin = async (req,res) =>{

    var search = '';
    if(req.query.search){
        search = req.query.search;
    }
   
    var page=0;
    var per_page=3;

    let allRecord = await Admin.find({
        $or : [
            {name : {$regex: search, $options:"i"}},
            {email : {$regex: search, $options:"i"}},
        ]
    }).countDocuments();
    let totalPage = Math.ceil(allRecord/per_page)
    
    if(req.query.page){
        page=req.query.page
    }

    let AdminData = await Admin.find({
        $or : [
            {name : {$regex: search, $options:"i"}},
            {email : {$regex: search, $options:"i"}},
        ]
    })
    .skip(page*per_page)
    .limit(per_page)



    

    return res.render('view_admin',{
        AdminRecord : AdminData,
        search : search,
        totalPage :totalPage,
        currentPage : page,
        per_page : per_page
    });
}


module.exports.insertAdminData =async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = Admin.iPath+"/"+req.file.filename;
        }   
        req.body.name = req.body.fname+" "+req.body.lname;
        req.body.image = img;
        req.body.status = true;
        let adminData = await Admin.create(req.body);
        
        if(adminData){
            // console.log("Admin Record Inserted");
            req.flash('success',"Admin Record Inserted");
            return res.redirect('back')
        }
        else{
            console.log("Something wrong");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log("something wrong",err);
        return res.redirect('back');
    }
}

module.exports.deleteAdminRecord = async (req,res) =>{
   try{
        let singleAdmin = await Admin.findById(req.params.id);
        if(singleAdmin){
            var imPath = path.join(__dirname,'..',singleAdmin.image);
            await fs.unlinkSync(imPath);
            
            let deleteAdmin = await Admin.findByIdAndDelete(req.params.id);
            if(deleteAdmin){
                // console.log("Record Deleted Successfully");
                req.flash('success',"Record Deleted Successfully");
                return res.redirect('back');
            }
            else{
                // console.log("Record not deleted from db");
                req.flash('error',"Record not deleted from db")
                return res.redirect('back');
            }
        }
        else{
            // console.log("Record not found");
            req.flash('error',"Record not found")
            return res.redirect('back');
        }
   }
   catch(err){
        console.log(err);
        req.flash('error',"something wrong")
        return res.redirect('back');
   }
}


module.exports.changePass = async (req,res) =>{
    return res.render('changePass');
}

module.exports.resetAdminPass = async (req,res) =>{
   if(req.body.cpass == req.user.password){
      if(req.body.cpass != req.body.npass){
         if(req.body.npass == req.body.copass){
             let changed = await Admin.findByIdAndUpdate(req.user.id,{
                password : req.body.npass
             })
             if(changed){
                return res.redirect('/admin/logout');
             }
             else{
                console.log("Not changed");
                return res.redirect('back');
             }
         }
         else{
            console.log("Confirm password not match");
            return res.redirect('back');
         }
      }
      else{
          console.log("Current and new password Are same");
          return res.redirect('back');

      }
   }
   else{
     console.log("Db password  not match");
     return res.redirect('back');
   }
}

module.exports.updateAdminRecord = async (req,res) =>{
    try{
        let singleAdmin = await Admin.findById(req.query.adminId);
        if(singleAdmin){
            return res.render('update_admin',{
                "singleRecord" : singleAdmin
            })
        }
        else{
            console.log("Record not found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.EditAdminData = async (req,res) =>{
    try{
        if(req.file){
            let singleAdmin = await Admin.findById(req.params.id);
            if(singleAdmin){
                var imPath = path.join(__dirname,'..',singleAdmin.image);
                await fs.unlinkSync(imPath);
            }
            
            var img = '';
            req.body.image = Admin.iPath+"/"+req.file.filename;
            req.body.name = req.body.fname+" "+req.body.lname;
            let upAdmin = await Admin.findByIdAndUpdate(req.params.id,req.body);
            if(upAdmin){
                console.log("record updated");
                return res.redirect('/admin/view_admin');
             }    
             else{
                  console.log("record Not updated");
                  return res.redirect('back');
             }
        }
        else{
           let singleAdmin = await Admin.findById(req.params.id);
           if(singleAdmin){
               req.body.image = singleAdmin.image;
               req.body.name = req.body.fname+" "+req.body.lname;
               let upAdmin = await Admin.findByIdAndUpdate(req.params.id,req.body);
               if(upAdmin){
                  console.log("record updated");
                  return res.redirect('/admin/view_admin');
               }    
               else{
                    console.log("record Not updated");
                    return res.redirect('back');
               }
           }
           else{
              console.log("Record not found");
              return res.redirect('back');
           } 
        }
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}


module.exports.fogetPass = async (req,res) =>{
    try{
        return res.render('forgetPass');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.checkEmailForget = async (req,res) =>{
    try{
        let checkEmail = await Admin.findOne({email:req.body.email});
        if(checkEmail){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "rwn2developerfaculty@gmail.com",
                  pass: "qtlmqutxrxngjmde",
                },
              });

              var otp = Math.round(Math.random()*100000);
              res.cookie('otp',otp);
              res.cookie('email',req.body.email);

              var msg = `<h1>RNW Institute</h1><b>OTP:${otp}</b> <a href="http://localhost:8001/admin/adminChangePassword">Click Here</a>`;
             
              const info = await transporter.sendMail({
                from: 'rwn2developerfaculty@gmail.com', 
                to: req.body.email, 
                subject: "Your OTP is Here", 
                text: "Hello world?", 
                html: msg, 
              });

              
              return res.redirect('/admin/OtpPage');
                
        }
        else{
            console.log("Invalid email");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.OtpPage = async (req,res)=>{
    return res.render('CheckOtp');
}

module.exports.verifyOtp = async (req,res)=>{
    // console.log(req.body);
    // console.log(req.cookies.otp);
    try{
        if(req.body.otp == req.cookies.otp){
            res.clearCookie('otp');
            return res.redirect('/admin/adminChangePassword');
        }
        else{
            console.log("OTP not Match");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.adminChangePassword = async(req,res) =>{
    return res.render('adminChangePass');
}

module.exports.resetPass = async (req,res) =>{
    try{
        if(req.body.npass == req.body.cpass){
            var email = req.cookies.email;
            let checkEmail = await Admin.findOne({email:email});
            if(checkEmail){
                 let changePass =await Admin.findByIdAndUpdate(checkEmail.id,{
                    password : req.body.npass
                 })
                 if(changePass){
                    res.clearCookie('email');
                    return res.redirect('/admin')
                 }
                 else{
                    console.log("password not changed");
                    return res.redirect('back');
                 }
            }
            else{
                console.log("Invalid email");
                return res.redirect('back');
            }
        }
        else{
            console.log("new and confirm password not match");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.deactive= async (req,res) =>{
    try{
        let adminDeactive = await Admin.findByIdAndUpdate(req.params.id,{status: false});
        if(adminDeactive){
            req.flash('success','Record deactive successfully');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.active= async (req,res) =>{
    try{
        let adminDeactive = await Admin.findByIdAndUpdate(req.params.id,{status: true});
        if(adminDeactive){
            req.flash('success','Record Active successfully');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deleteMultipleRecords = async (req,res) =>{
    try{
        let d = await Admin.deleteMany({_id : {$in : req.body.adminIds}});
        if(d){
            req.flash('success',"Multiple Records Deleted ");
            return res.redirect('back');
        }
        else{
            req.flash("error",'something wrong');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}