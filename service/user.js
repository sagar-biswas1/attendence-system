const User= require("../models/user")


const findUsers=()=>{
    return User.find()
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

module.exports = { findUsers,findUserByProperty, createNewUser };