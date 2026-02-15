const express = require("express");
const router = express.Router();
const StudentMentor = require("../model/studentMentor.model");


router.post("/", async (req, res) => {
    try {
        const { StudentMentorId, StudentId, StaffId, FromDate, ToDate, Description } = req.body
        const studentMentor = await StudentMentor.create({
            StudentMentorId, StudentId, StaffId, FromDate, ToDate, Description
        })
        res.status(200).json({ message: "studentMentor created", studentMentor });

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.get("/", async (req, res) => {
    try {
        const studentMentor = await StudentMentor.find();

        if (!studentMentor) res.status(400).json({ message: "record not found for student mentor." })
        res.status(200).json({ message: "Data fetched", studentMentor });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const studentMentor = await StudentMentor.findById(req.params.id);

        if (!studentMentor) res.status(400).json({ message: "record not found for student mentor." })
        res.status(200).json({ message: "Data fetched", studentMentor });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const studentMentor = await StudentMentor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!studentMentor) res.status(400).json({ message: "record not found for student mentor." })
        res.status(200).json({ message: "Data fetched", studentMentor });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const studentMentor = await StudentMentor.findByIdAndDelete(req.params.id)
        if (!studentMentor) res.status(400).json({ message: "student is not exists" })
        res.status(200).json({ message: "student deleted successfully" })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})


module.exports = router