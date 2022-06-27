const User= require("../models/user");
const error = require("../utils/error");


const findUsers=()=>{
    return User.find()
}

const deleteUserById=(id)=>{
    return User.findOneAndRemove({ _id: id });
}

const updateUserById=(id,data)=>{
    

   
    return User.findByIdAndUpdate(id,{...data},{new:true})
}


const findUserByProperty=(key,value)=>{
   // console.log({key,value})
    if(key==="_id"){

        return User.findById(value);
    }
    return User.findOne({[key]:value});
}

const createNewUser=({name, email, password,roles,accountStatus})=>{
    //console.log({name, email, password})
   const user = new User({
     name,
     email,
     password,
     roles: roles ? roles : ["STUDENT"],
     accountStatus:accountStatus?accountStatus: "PENDING",
   });
   
   return user.save()
}

module.exports = {
  findUsers,
  findUserByProperty,
  createNewUser,
  updateUserById,
  deleteUserById,
};