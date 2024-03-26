const express = require('express');

const port = 8001;

const app = express();

const path = require('path');

console.log("hi");

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://tishaviradiya1:opW58yujDXWsE640@cluster0.9lcq0wh.mongodb.net/adminBlog",
{
    useNewUrlParser : true 
})
  .then((res)=>{
    console.log("Db is connected on server");
  })
  .catch((err)=>{
    console.log(err);
  })

const cookieParser = require('cookie-parser');


const passport = require('passport');
const localStrategy = require('./config/localStrategy');
const session = require('express-session');

const connectFlash = require('connect-flash');
const customFlash = require('./config/customFlash');
app.use(connectFlash());



app.use(cookieParser());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));
app.use("/uploads", express.static(path.join(__dirname,'uploads')));


app.use(session({
    name : "CodingData",
    secret : "Code",
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*100*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);
app.use(customFlash.setFlash);

app.use("/", require('./routes'));

app.listen(port, async (err)=>{
    err?console.log(err):console.log("server is running:",port);
})