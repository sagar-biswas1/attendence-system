const express= require("express")
const app= express()
const port = 5000 || process.env.PORT



app.get("/",(_,res)=>{
    throw new Error("Resource not found");
    res.send("hello world");
})



const errorHandler = (_req, _res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
};


const notFoundHandler=(err,req,res,next)=>{
if(err.status){
   return res.status(err.status).send(err.message)
}
 
 res.status(500).send({
    message:"something went wrong...."
 });
 


}

app.use([errorHandler, notFoundHandler])

app.listen(port,()=>{
    console.log("server is running in port",port);
})