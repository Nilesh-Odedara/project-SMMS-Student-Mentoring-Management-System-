const mongoose = require("mongoose")

const StudentMentoringSchema = mongoose.Schema({
    StudentMentoringId:Number,
    StudentMentorId:Number,
    DateOfMentoring:Date,
    ScheduledMeetingDate:Date,
    NextMentoringDate:Date,
    IssuesDiscussed:String,
    MentoringMeetingAgenda:String,
    AttendanceStatus:String,
    AbsentRemarks:String,
    IsParentPresent:Boolean,
    ParentName:String,
    ParentMobileNo:Number,
    StudentsOpinion:String,
    ParentsOpinion:String,
    StaffOpinion:String,
    StressLevel:String,
    LearnerType:String,
    MentoriongDocument:String,
    Description:String,
}, { timestamps: true })

module.exports = mongoose.model("studentmentoring", StudentMentoringSchema)