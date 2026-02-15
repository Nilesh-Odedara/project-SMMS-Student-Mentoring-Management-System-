const mongoose = require("mongoose")

const staffSchema = mongoose.Schema({
    StaffID: {type:Number, unique: true},
    StaffName : String,
    MobileNo : Number,
    EmailAddress : {type:String,required : true},
    Password: String,
    Description : String
}, {timestamps:true})

module.exports = mongoose.model("staff", staffSchema)