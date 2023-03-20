const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Products");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
// when using app.post and access json data than and insert it in db

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Enter complete details" });
  }
});
app.post("/add-product", async (req, res) => {
  let product=new Product(req.body);
  let result=await product.save();
  res.send(result);
});

app.get("/products",async(req,res)=>{
  let product=await Product.find();
  if(product.length>0){
    res.send(product)
  }else{
    res.send({result:"No data found"})
  }
})

app.delete("/product/:id",async(req,res)=>{
    // res.send(req.params.id);
    const result=await Product.deleteOne({_id:req.params.id});
    res.send(result);

})

app.get("/product/:id",async(req,res)=>{
  const result=await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }
  else{
    res.send({result:"No data found"})
  }
})

app.put("/product/:id",async(req,res)=>{
  let result=await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
    )
    res.send(result);
});

app.get("/search/:key",async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
    ]
  })
  res.send(result)
})


app.listen(5000, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", 5000);
});
