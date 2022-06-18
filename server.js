const express = require("express");
const connectDB = require("./db");
const app = express();
require("dotenv").config();
const port = 5000 || process.env.PORT;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xkom1i8.mongodb.net/?retryWrites=true&w=majority`;
app.use(express.json());

app.post("/register", async (req, res, next) => {
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
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "user already exist..." });
    }

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    user.password = hashPass;

    await user.save();

    return res
      .status(201)
      .send({ message: "user created successfully...", user: { name:user.name, email:user.email } });
  } catch (err) {
    const error = new Error(err.message);

    error.status = 404;
    next(error);
  }
});



app.post("/login",async (req,res,next)=>{
  const {email,password}=req.body
try{
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
  return res.status(200).send({ message: "Login successfully",user });
}

}catch{
  const error = new Error(err.message);

  error.status = 404;
  next(error);
}


})

app.get("/health", (_, res) => {
  res.send("hello world");
});




const errorHandler = (_req, _res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
};

const notFoundHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(err.message);
  }

  res.status(500).send({
    message: "something went wrong....",
  });
};

app.use([errorHandler, notFoundHandler]);

connectDB(mongoUri).then(() => {
  console.log("connected to db");
  app.listen(port, () => {
    console.log("server is running in port", port);
  });
});
