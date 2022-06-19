const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController=async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !(password.length >= 8)) {
      const passErrorMsg =
        password.length < 8 ? "You password is less than 8 charecters" : "";
      return res.status(400).send({
        message: `invalid form data . provide a valid name, email and pass.${passErrorMsg}."
          } `,
      });
    }
  
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ message: "user already exist..." });
      }
  
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
  
      user.password = hashPass;
  
      await user.save();
  
      return res
        .status(201)
        .send({ message: "user created successfully...", user: { name:user.name, email:user.email } });
    } catch (err) {
      const error = new Error(err.message);
  
      error.status = 404;
      next(error);
    }
  }


  const loginController=async (req,res,next)=>{
    const {email,password}=req.body
  try{
   const user = await User.findOne({ email });
   if (!user) {
     return res.status(400).send({ message: "Invalid credentials..." });
   }
  
   const isMatched=await bcrypt.compare(password,user.password) 
  
  if(!isMatched){
     return res.status(400).send({ message: "Invalid credentials..." });
  }
  else{
    delete user._doc.password
    const token=jwt.sign(user._doc,"secretkey",{expiresIn:"1h"})
    console.log(token)
    return res.status(200).send({ message: "Login successfully",token });
  }
  
  }catch(err){
    const error = new Error(err.message);
  
    error.status = 404;
    next(error);
  }
  
  
  }

  module.exports ={loginController,registerController}