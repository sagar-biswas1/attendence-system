const {
  createAttendance,
  runningAttendance,
} = require("../service/adminAttendance");

const getEnable = async (req, res, next) => {
  try {
    const attendance = await createAttendance();
    return res.status(201).json({ message: "success", attendance });
  } catch (e) {
    next(e);
  }
};

const getDisable = async (req, res, next) => {
  try {
    const running = await runningAttendance(true);
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const running = await runningAttendance();

    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};
