const express = require("express");
const { authModel } = require("../model/auth.model");
const router = express.Router()
const bcrypt = require("bcrypt")



router.post("/register", async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const checkUserAlreadyExist = await authModel.findOne({email})

        if(checkUserAlreadyExist){
          return  res.status(200).json({msg:"User already exist"})  
        }
        

        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
               return res.status(400).json({msg:err.message}) 
            }
            const newUser = new authModel({name,email,password:hash})
            await newUser.save()
            return res.status(400).json({msg:"user registered successfully"})
        });

    } catch (error) {
        res.status(400).json({msg:error?.message}) 
    }
})



router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.status(200).send({
              msg: "login successfull",
            });
          } else {
            res.status(400).send({"msg":"wrong credential"});
          }
        });
      } else {
        res.status(400).send({ msg: "No user exist" });
      }
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });
  








module.exports = {
    router
}