const express = require("express");
const router = express.Router();
const StudentMentoring = require("../model/studentMentoring.model");



router.post("/", async (req, res) => {
    try {
        const { StudentMentoringId, StudentMentorId, DateOfMentoring, ScheduledMeetingDate, NextMentoringDate, IssuesDiscussed, MentoringMeetingAgenda, AttendanceStatus, AbsentRemarks, IsParentPresent, ParentName, ParentMobileNo, StudentsOpinion, ParentsOpinion, StaffOpinion, StressLevel, LearnerType, MentoriongDocument, Description } = req.body
        const studentMentoring = await StudentMentoring.create({
          StudentMentoringId, StudentMentorId, DateOfMentoring, ScheduledMeetingDate, NextMentoringDate, IssuesDiscussed, MentoringMeetingAgenda, AttendanceStatus, AbsentRemarks, IsParentPresent, ParentName, ParentMobileNo, StudentsOpinion, ParentsOpinion, StaffOpinion, StressLevel, LearnerType, MentoriongDocument, Description 
        })
        res.status(200).json({ message: "studentMentoring created", studentMentoring });

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.get("/", async (req, res) => {
    try {
        const studentMentoring = await StudentMentoring.find();

        if (!studentMentoring) res.status(400).json({ message: "record not found for student mentor." })
        res.status(200).json({ message: "Data fetched", studentMentoring });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const studentMentoring = await StudentMentoring.findById(req.params.id);

        if (!studentMentoring) res.status(400).json({ message: "record not found for student mentor." })
        res.status(200).json({ message: "Data fetched", studentMentoring });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const studentMentoring = await StudentMentoring.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!studentMentoring) res.status(400).json({ message: "record not found for student mentor." })
        res.status(200).json({ message: "Data fetched", studentMentoring });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const studentMentoring = await StudentMentoring.findByIdAndDelete(req.params.id)
        if (!studentMentoring) res.status(400).json({ message: "student is not exists" })
        res.status(200).json({ message: "student deleted successfully" })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})


module.exports = router