const express = require("express");
require("./db/config");
const User = require("./db/User");
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
  }
  else{
    res.send({result:"Enter complete details"})
  }
});
app.listen(5000, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", 5000);
});
