const Meeting = require("../models/Meeting");
// Scheduling meeting for child adoption
const scheduleMeeting = async (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: "Appointment date, name and email are required",
    });
  }
  const payload = { appointmentDate, name, email };
  try {
    await Meeting.insertOne(payload).exec((error, result) => {
      res.status(200).send(result);
      if (error) {
        res.status(400).send(error);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = {
  scheduleMeeting,
};
