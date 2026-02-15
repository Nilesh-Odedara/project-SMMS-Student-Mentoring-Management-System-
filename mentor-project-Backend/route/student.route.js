const express = require("express");
const routeStu = express.Router()
const Student = require("../model/student.model");
const authMiddleware = require("../middleware/auth.middleware")

// routeStu.use(authMiddleware)

routeStu.get("/",async(req, res)=>{
    try{
        const student = await Student.find()

        if(!student){
            return res.status(400).json({message:"student data is not available"})
        }
        res.status(200).json({message:"student fetched",student})
    }catch(err){
        res.status(400).json({err})
    }
})

routeStu.get("/:id",async (req, res) => {
    try{
        const student = await Student.findById(req.params.id)

        if(!student){
            return res.status(400).json({message:"student data is not available"})
        }
        res.status(200).json({message:"student found",student})
    }catch(err){
        res.status(400).json({err})
    }
})



routeStu.post("/",async(req,res)=>{
    try{
        const {studentId,StudentName, EnrollmentNo,Password,MobileNo,EmailAddress,Description} = req.body;

        const student = await Student.create({studentId,StudentName, EnrollmentNo,Password,MobileNo,EmailAddress,Description})
        res.status(200).json({message:"student added",student})
    }catch(err){
        res.status(400).json({err})
    }
})



routeStu.patch("/:id", async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new : true}
        )

        if(!student){
            return res.status(400).json({message:"student data is not available"})
        }
        res.status(200).json({message:"student Updates",student})
    }catch(err){
        res.status(400).json({err})
    }
})

routeStu.delete("/:id", async(req, res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
        if(!student) res.status(400).json({message:"student is not exists"})
        res.status(200).json({message:"student deleted successfully"})
    }catch(err){
        res.status(400).json({err : err.message})
    }
})

module.exports = routeStu