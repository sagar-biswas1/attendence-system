const{loginService,registerService}=require("../service/auth")
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
    const user = await registerService(name,email,password)
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
   
  const token= await loginService({email, password})
  return res.status(200).send({ message: "Login successfully",token });
  }catch(err){
    const error = new Error(err.message);
  
    error.status = 404;
    next(error);
  }
  
  
  }

  module.exports ={loginController,registerController}