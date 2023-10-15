const mongoose = require('mongoose')
const schema = mongoose.Schema
const regSchema = new schema({
     name:{type:String},
     phone:{type:String},
     address:{type:String},
     loginId:{type:mongoose.Types.ObjectId,ref:"login_tb"}
})
const regModel=mongoose.model('reg_tb',regSchema) 
module.exports=regModel