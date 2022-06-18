const {model, Schema}= require("mongoose")

const adminAttendanceSchema= new Schema({
    createdAt:Date,
    timeLimit:Number,
    status: String,
})


const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);

module.exports= AdminAttendance