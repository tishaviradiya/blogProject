const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const Admin = require('../models/AdminModel');

passport.use(new localStrategy({
    usernameField : "email"
}, async function(email,password, done){  
    
     let checkEmail = await Admin.findOne({email:email});
    
     if(checkEmail){
        if(checkEmail.password == password){
            return done(null,checkEmail);
        }
        else{
            return done(null,false);
        }
     } 
     else{
        return done(null,false);
     }
}))


passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(async function(id,done){
    let adminData = await Admin.findById(id);
    if(adminData){
        return done(null,adminData);
    }
    else{
        return done(null,false);
    }
})


passport.setAuth = (req,res,next) =>{
     if(req.isAuthenticated()){
        res.locals.admins = req.user;
     }
     next();
}

passport.checkAuth = (req,res,next) =>{
    
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/admin/');
    }
}


module.exports = passport;