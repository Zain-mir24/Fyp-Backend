const { Appointment } = require("../models/Appointment")

const viewMeeting = {
    all(req, res) {
        // Returns all appointments
        Appointment.find({}).populate("childId").exec((err, appointments) => res.json(appointments));
    }
};
const createMeeting = async (req, res, next) => {
    const newAppointment = new Appointment(req.body)
    console.log(newAppointment, "my new appointment")
    try {
        await newAppointment.save()
        res.status(200).send("appointment created")

    } catch (e) {
        res.status(500).send(e)

    }
}
module.exports = { viewMeeting, createMeeting };