const mongoose = require('mongoose');

const OtherSchema = mongoose.Schema({
    country : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    city: {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})




const Other = mongoose.model("Other",OtherSchema);

module.exports = Other;


