const error=(msg="Something went wrong",status=500)=>{
    const error= new Error(msg)
    error.status=400
    return error
}

module.exports=error