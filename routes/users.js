const router = require("express").Router();
const userController= require("../controller/users")

/**
 * get user by id or email
 */

router.get("/:userId", userController.getUserById);

/**
 * update user by id
 * @method Patch
 */

router.patch("/:userId", async (req, res) => {})
/**
 * delete user by id
 * @method Delete
 */

router.delete("/:userId", userController.deleteUserById);


/**
 * Get all Users , include---
 * -filter
 * -sort
 * -pagination
 * -select property
 * @route /api/v1/users?users?sort=["by","name"]
 * @method Get
 * @visibility Private
 *
 *
 */

router.get("/", userController.getUsers);

/**
 * create a new user
 */
router.post("/", userController.postUser);


module.exports = router;
