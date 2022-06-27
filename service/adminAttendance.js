const AdminAttendance = require("../models/adminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const createAttendance = async (data) => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });

  if (running) {
    throw error("Already running the attendance system", 400);
  }
  const attendance = new AdminAttendance({});
  return attendance.save();
};

const runningAttendance = async (isForcedStop = false) => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (!running) {
    throw error("No attendance system is running", 400);
  }
  if (!isForcedStop) {
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      running.save();
    }
  }else{
    running.status = "COMPLETED";
    running.save();
  }

  return running;
};

module.exports = { createAttendance, runningAttendance };
