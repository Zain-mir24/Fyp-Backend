const mongoose = require("mongoose");



const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
