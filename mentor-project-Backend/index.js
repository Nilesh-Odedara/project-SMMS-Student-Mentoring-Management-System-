const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors") 
dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()) 

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
    
})

const studentRoute = require("./route/student.route")
// const studentAuth = require("./route/auth.route")
// const {staffAuth, studentAuth} = require("./route/auth.route")
const Auth = require("./route/auth.route")
const staffRoute = require("./route/staff.route")
const studentMentorRoute = require("./route/studentMentor.route")
const studentMentoringRoute = require("./route/studentMentoring.route")

app.use("/student",studentRoute)
app.use("/",Auth)
app.use("/staff",staffRoute)
app.use("/studentmentor",studentMentorRoute)
app.use("/studentmentoring",studentMentoringRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server started at ${process.env.PORT}`);
})