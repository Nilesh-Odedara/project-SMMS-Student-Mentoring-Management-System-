const express = require("express");
const routeStaff = express.Router()
const Staff = require("../model/staff.model");
const authMiddleware = require("../middleware/auth.middleware")

routeStaff.use(authMiddleware)

routeStaff.get("/",async(req, res)=>{
    try{
        const staff = await Staff.find()

        if(!staff){
            return res.status(400).json({message:"staff data is not available"})
        }
        res.status(200).json({message:"staff fetched",staff})
    }catch(err){
        res.status(400).json({err})
    }
})

routeStaff.get("/:id",async (req, res) => {
    try{
        const staff = await Staff.findById(req.params.id)

        if(!staff){
            return res.status(400).json({message:"staff data is not available"})
        }
        res.status(200).json({message:"staff found",staff})
    }catch(err){
        res.status(400).json({err})
    }
})



// routeStaff.post("/",async(req,res)=>{
//     try{
//         const {StaffID,StaffName, EnrollmentNo,Password,MobileNo,EmailAddress,Description} = req.body;

//         const staff = await Staff.create({StaffID,StaffName, EnrollmentNo,Password,MobileNo,EmailAddress,Description})
//         res.status(200).json({message:"staff added",staff})
//     }catch(err){
//         res.status(400).json({err})
//     }
// })



routeStaff.patch("/:id", async (req, res) => {
    try{
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new : true}
        )

        if(!staff){
            return res.status(400).json({message:"staff data is not available"})
        }
        res.status(200).json({message:"staff Updates",staff})
    }catch(err){
        res.status(400).json({err})
    }
})

routeStaff.delete("/:id", async(req, res)=>{
    try{
        const staff = await Staff.findByIdAndDelete(req.params.id)
        if(!staff) res.status(400).json({message:"staff is not exists"})
        res.status(200).json({message:"staff deleted successfully"})
    }catch(err){
        res.status(400).json({err : err.message})
    }
})

module.exports = routeStaff