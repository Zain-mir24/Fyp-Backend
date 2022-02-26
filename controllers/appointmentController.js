const { Appointment } = require("../models/Appointment")

const viewMeeting = {
    all(req, res) {
        // Returns all appointments
        Appointment.find({}).populate("childId").exec((err, appointments) => res.json(appointments));
    }
    // create(req, res) {
    //     var requestBody = req.body;
    //     // Creates a new record from a submitted form
    //     var newappointment = new Appointment({
    //         name: requestBody.name,
    //         email: requestBody.email,
    //         SlotTime: requestBody.SlotTime,
    //         SlotDate: requestBody.SlotDate,
    //         childId: requestBody.childId
    //     });
    //     // and saves the record to
    //     // the data base
    //     newappointment.save((err, saved) => {
    //         // Returns the saved appointment
    //         // after a successful save
    //         Appointment.find({ _id: saved._id })
    //             .populate("childId")
    //             .exec((err, appointment) => res.json(appointment));

    //     });
    // }
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