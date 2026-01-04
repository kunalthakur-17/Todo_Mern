const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    username:{
        type : String,
        // required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    treamandcondition:{
        type : Boolean,
        
    }
},{timestamps : true})


const UserModel = mongoose.model("UserModel", userSchema)

module.exports = UserModel