const express = require("express");
// const studentAuth = express.Router()
// const staffAuth = express.Router()
const Auth = express.Router()
const Student = require("../model/student.model")
const Staff = require("../model/staff.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//student auth
Auth.post("/student/register",async (req,res)=>{
    try{
        const {StudentId,StudentName, EnrollmentNo,Password,MobileNo,EmailAddress,Description} = req.body;
        const checkEmail = await Student.findOne({EmailAddress});

        if(checkEmail) return res.status(401).json({message : "email already exists."})
        
        const hashedPass = await bcrypt.hash(Password,10);
        
        const student = await Student.create({
            StudentId,
            StudentName,
            EnrollmentNo,
            Password : hashedPass,
            MobileNo,
            EmailAddress,
            Description
        })
        

        res.status(200).json({message:"user created successfully",StudentId,StudentName, EnrollmentNo,MobileNo,EmailAddress,Description})
    }catch(err){
        res.status(400).json({err : err.message})
    }
})

Auth.post("/student/login",async(req,res)=>{
    try{
        const {EmailAddress,Password} = req.body
        const student = await Student.findOne({EmailAddress})

        if(!student) return res.json({message:"student not exists"})
        const isMatch = await bcrypt.compare(Password,student.Password)
        const isPlaintextMatch = Password === student.Password;

        if(!isMatch && !isPlaintextMatch) return res.status(401).json({message:"Invalid credential"})

        const token = jwt.sign({id:student._id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"})
        const refreshToken = jwt.sign({id:student._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        
        res.status(200).json({message:"login successfully", token, refreshToken, userId: student._id})
    }catch(err){
        res.status(400).json({err : err.message})
    }
})





//staff auth
Auth.post("/staff/register",async (req,res)=>{
    try{
        const {StaffID,StaffName,Password,MobileNo,EmailAddress,Description} = req.body;
        const checkEmail = await Staff.findOne({EmailAddress});

        if(checkEmail) return res.status(401).json({message : "email already exists."})
        
        const hashedPass = await bcrypt.hash(Password,10);
        
        const staff = await Staff.create({
            StaffID,
            StaffName,
            MobileNo,
            Password : hashedPass,
            EmailAddress,
            Description
        })
        

        res.status(200).json({message:"user created successfully",StaffID,StaffName,MobileNo,EmailAddress,Description})
    }catch(err){
        res.status(400).json({err : err.message})
    }
})


Auth.post("/staff/login",async(req,res)=>{
    try{
        const {EmailAddress,Password} = req.body
        const staff = await Staff.findOne({EmailAddress})

        if(!staff) return res.json({message:"staff not exists"})
        console.log(staff.Password)
        const isMatch = await bcrypt.compare(Password,staff.Password)
        const isPlaintextMatch = Password === staff.Password;

        if(!isMatch && !isPlaintextMatch) return res.status(401).json({message:"Invalid credential"})

        const token = jwt.sign({id:staff._id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"})
        const refreshToken = jwt.sign({id:staff._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        
        res.status(200).json({message:"login successfully", token, refreshToken, userId: staff._id})
    }catch(err){
        res.status(400).json({err : err.message})
    }
})

Auth.post("/refresh-token", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: "Refresh token not provided" });

        jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

            // Issue a new access token
            const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
            res.status(200).json({ token: newToken });
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});


module.exports = Auth
// module.exports = studentAuth
// module.exports = staffAuth