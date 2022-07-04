const StudentAttendance = require("../models/studentAttendence");
const AdminAttendance = require("../models/adminAttendance");
const error = require("../utils/error");
const { runningAttendance } = require("../service/adminAttendance");

const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw error("Invalid attendance id", 400);
    }

    if (adminAttendance.status === "COMPLETED") {
      throw error("Attendance is not running", 400);
    }
    let attendance = await StudentAttendance.findOne({
      user: req.user._id,
      adminAttendance: id,
    });
    console.log(attendance);
    if (attendance) {
      throw error("Already performed", 400);
    }
    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    
    await attendance.save();
    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};
const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await runningAttendance();

    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};
module.exports = { getAttendanceStatus, getAttendance };
