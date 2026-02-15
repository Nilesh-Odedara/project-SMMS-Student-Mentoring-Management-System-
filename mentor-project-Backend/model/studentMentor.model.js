const mongoose = require("mongoose")

const StudentMentorSchema = mongoose.Schema({
    StudentMentorId: Number,
    StudentId: Number,
    StaffId: Number,
    FromDate: Date,
    ToDate: Date,
    Description: String,
}, { timestamps: true })

module.exports = mongoose.model("studentmentor", StudentMentorSchema)