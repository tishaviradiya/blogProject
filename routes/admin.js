const express = require('express');

const routs = express.Router();

const passport = require('passport');

const AdminController = require('../controllers/AdminController');
const Admin = require('../models/AdminModel');

routs.get("/", AdminController.login);

routs.post("/signIn",passport.authenticate('local',{failureRedirect : '/admin/',failureFlash : "Invalid Credentials"}),AdminController.signIn);

routs.get("/logout", async (req,res)=>{
    // res.clearCookie("admin");
    try{
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            return res.redirect('/admin');
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('/admin');
    }

});

routs.get("/changePass", passport.checkAuth,AdminController.changePass);

routs.post("/resetAdminPass", passport.checkAuth, AdminController.resetAdminPass);

routs.get('/profile', passport.checkAuth, AdminController.profile);

routs.get("/dashboard",passport.checkAuth,AdminController.dashboard);

routs.get("/add_admin",passport.checkAuth, AdminController.addAdmin);

routs.get("/view_admin",passport.checkAuth, AdminController.viewAdmin);

routs.post("/insertAdminData",Admin.uploadImage ,AdminController.insertAdminData);

routs.get("/deleteAdminRecord/:id",AdminController.deleteAdminRecord);

routs.get("/updateAdminRecord", passport.checkAuth,AdminController.updateAdminRecord);

routs.post("/EditAdminData/:id",Admin.uploadImage, AdminController.EditAdminData);

///Forgot password process
routs.get("/fogetPass", AdminController.fogetPass);

routs.post("/checkEmailForget", AdminController.checkEmailForget);

routs.get("/OtpPage", AdminController.OtpPage);

routs.post("/verifyOtp", AdminController.verifyOtp);

routs.get("/adminChangePassword", AdminController.adminChangePassword);

routs.post("/resetPass", AdminController.resetPass);

routs.get("/deactive/:id", AdminController.deactive);
routs.get("/active/:id", AdminController.active);

routs.post("/deleteMultipleRecords", AdminController.deleteMultipleRecords);

routs.use("/slider",passport.checkAuth ,require('./slider'));

routs.use("/others", passport.checkAuth , require('./others'));
routs.use("/category", passport.checkAuth , require('./category'));
routs.use("/subcategory", passport.checkAuth , require('./subcategory'));

routs.use("/posts", passport.checkAuth, require('./posts'));
routs.use("/comments", passport.checkAuth, require('./comments'));
///End of forgot passwrod process
module.exports = routs;