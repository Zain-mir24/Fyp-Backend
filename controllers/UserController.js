const Meeting = require("../models/Meeting");
const children = require("../models/Children");

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
const viewChildren =async(req,res,next)=>{
  try {
    await children.find({}).exec((error, result) => {
      console.log("result", result);
      res.status(200).send(result);
      if (error) {
        console.log(error);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
module.exports = {
  viewChildren,
  scheduleMeeting
};
