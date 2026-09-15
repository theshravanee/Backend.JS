let mongoose= require('mongoose')

let userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    resetToken: String,
    resetTokenExpiry: Date,
})
let User= mongoose.model("User", userSchema)
module.exports= User