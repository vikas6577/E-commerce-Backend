const express=require('express');

const app=express();

app.get('/',(req,res)=>{
    res.send("Welcome to e-dashboard")
})

app.listen(5000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 5000);
})
// ...