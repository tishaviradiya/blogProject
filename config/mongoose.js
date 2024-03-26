const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/blogAdmin");

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("Something wrong");
        return false;
    }
    console.log("Db is connected");
})

module.exports = db;