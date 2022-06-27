//const User = require("../models/user")
const userService = require("../service/user");
const error = require("../utils/error");
const authService = require("../service/auth");

/**
     * todo in all private routes
     * check if token email matched with user email
     * - will get token email from req.user.email
     * - will find user from db by email or id
     * - will match the user email
     * -if false -> error message
     * -if true -> go further
  */

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
  //const email = req.user.email;
  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 400);
    }
    // if (email !== user.email) {
    //   throw error("Wrong credentials...", 400);
    // }
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
      accountStatus
    );
    return res.status(200).json(user);
  } catch (e) {
    console.log("error happened", e);
    next(e);
  }
};

const putUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, roles, accountStatus, email } = req.body;
  try {
    const searchUser = await userService.findUserByProperty("email", email);
    if (searchUser) {
      throw error("User exist with this email", 404);
    }
    const user = await userService.updateUserById(userId, {
      name,
      roles,
      accountStatus,
      email,
    });
    if (!user) {
      throw error("No user exists", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const pactUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, roles, status } = req.body;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("No user exists", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.status = status ?? user.status;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("No user exists with this id.", 400);
    }
    await user.remove();
    return res.status(203).json({ message: "deleted successfully" });
  } catch (e) {
    next(e);
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
