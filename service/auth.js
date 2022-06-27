const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{findUserByProperty,createNewUser}= require("./user")
const error = require("../utils/error")






const registerService = async (name, email, password, roles, accountStatus) => {
  let user = await findUserByProperty("email", email);
  // console.log(user)
  if (user) {
    throw error("user already exist...");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  //console.log({name, email, password,hashPass})
  //user.password = hashPass;

  return createNewUser({ name, email, password: hashPass,roles,accountStatus });
};

const loginService=async({email,password})=>{
  let user = await findUserByProperty("email",email)
  if (!user) {
    
    throw error("Invalid credentials...")
    
   }
  
   const isMatched=await bcrypt.compare(password,user.password) 
  
  if(!isMatched){
    const error= new Error("Invalid credentials...")
    error.status=400
    throw error
  }
  else{
    const payload={
      _id:user._id,
      email:user.email, 
      name:user.name,
      roles:user.roles,
      accountStatus:user.accountStatus,
    }
    //delete user._doc.password
    const token=jwt.sign(payload,"secretkey",{expiresIn:"1h"})
    
    return token
  }
}


module.exports={registerService,loginService}