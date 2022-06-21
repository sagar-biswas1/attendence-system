const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{findUserByProperty,createNewUser}= require("./user")


//todo -> start from->1.47.42




const registerService=async(name,email,password)=>{
    let user = await findUserByProperty("email",email)
    console.log(user)
    if (user) {
      const error= new Error("user already exist...")
      error.status=400
      throw error
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    console.log({name, email, password,hashPass})
    //user.password = hashPass;

   return createNewUser({name, email, password:hashPass})
}

const loginService=async({email,password})=>{
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
    return token
  }
}


module.exports={registerService,loginService}