const { registerController, loginController } = require('../controller/auth');

const router= require('express').Router();

//'/api/v1/auth/register'
router.post("/register",registerController );



router.post("/login",loginController );
module.exports=router