const express=require('express');
require('./db/config');
const User=require("./db/User")
const app=express();

app.use(express.json());
// when using app.post and access json data than and insert it in db

app.post("/register",async(req,res)=>{
    let user=new User(req.body);
    let result=await user.save();
    res.send(result)
})

app.listen(5000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 5000);
})
