const express = require("express");
const connectDB = require("./db");
const app = express();
require("dotenv").config();
const port = 5000 || process.env.PORT;
const routes=require("./routes")
const verifyJwt = require("./middleware/authentication");

mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xkom1i8.mongodb.net/?retryWrites=true&w=majority`;
app.use(express.json());

app.use(routes)

app.get("/health",verifyJwt, (req, res) => {
  console.log({user: req.user})
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
