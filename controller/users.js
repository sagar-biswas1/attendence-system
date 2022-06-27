//const User = require("../models/user")
const userService = require("../service/user");
const error = require("../utils/error");
const authService = require("../service/auth");
const getUsers = async (req, res, next) => {
  /**
   * filter sort pagination select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const email = req.user.email;
  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 400);
    }
    if (email !== user.email) {
      throw error("Wrong credentials...", 400);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService(
      name,
      email,
      password,
      roles,
      accountStatus,
    );
    return res.status(200).json(user);
  } catch (e) {
    console.log("error happened",e)
    next(e);
  }
};

const putUserById = (req, res, next) => {};

const pactUserById = (req, res, next) => {};

const deleteUserById =async (req, res, next) => {
     const userId = req.params.userId;
     
     try{
       const user = await userService.findUserByProperty("_id",userId);
          if(!user){
          throw  error("No user exists with this id.", 400);
          }
          await user.remove()
       return res.status(203).json({message:"deleted successfully"});
     }catch(e){
        
        next(e)
     }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  pactUserById,
  deleteUserById,
};
