const express=require("express");
const mongoose=require("mongoose");
const Student=require('./schemas/student.js');
const  fee=require ('./schemas/fees.js');
const dotenv=require('dotenv');

dotenv.config();
const app=express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb is connected")
})
.catch((err)=>{
    console.log("connection not successful", err.message )
})

app.get("/dashboard",(req,res)=>{
    res.send("Hello welcome to my server");
});



app.post('/student',async(req,res)=>{
    try{
        const{name,class:classId,rollNo}=req.body;
        const newStudent=new Student({
            name,class:classId,rollNo
        });
        await newStudent.save();
        res.send("student created successfully")

    }
    catch{
        console.log("internal server error")
    }

})
app.post('/fee',async(req,res)=>{
    // try{
        const{student,amount,date}=req.body;
        const newFee=new fee({
            student,amount,date
        })
        await newFee.save();
        res.send("fee document created successfully")
    // }catch{
    //     console.log("Internal server error")
    // }

})
app.get('/studentfee/:id',async(req,res)=>{
    try{

        const studentId=req.params.id;
        const student=await fee.find({student:studentId})
        res.send(student)
    }catch{
        console.log("internal server error")

    }
})
app.listen(4000,()=>{
    console.log("server is running")
})



