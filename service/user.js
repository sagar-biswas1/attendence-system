const User= require("../models/user")

const findUserByProperty=(key,value)=>{
    console.log({key,value})
    if(key==="_id"){

        return User.findById(value);
    }
    return User.findOne({[key]:value});
}

const createNewUser=({name, email, password})=>{
    console.log({name, email, password})
   const user = new User({ name, email, password });
   return user.save()
}

module.exports={findUserByProperty,createNewUser}