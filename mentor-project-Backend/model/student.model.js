const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    studentId : {type:Number,unique:true},
    StudentName:String,
    EnrollmentNo :Number,
    Password : String,
    MobileNo : Number,
    EmailAddress : String,
    Description : String
},{timestamps:true})

module.exports = mongoose.model("student",studentSchema);