const { Appointment } = require("../models/Appointment")

const appointmentController = {
    all(req, res) {
        // Returns all appointments
        Appointment.find({}).exec((err, appointments) => res.json(appointments));
    },
    create(req, res) {
        var requestBody = req.body;
        // Creates a new record from a submitted form
        var newappointment = new Appointment({
            name: requestBody.name,
            email: requestBody.email,
            SlotTime: requestBody.SlotTime,
            SlotDate: requestBody.SlotDate,
            childId: requestBody.childId
        });
        // and saves the record to
        // the data base
        newappointment.save((err, saved) => {
            // Returns the saved appointment
            // after a successful save
            Appointment.find({ _id: saved._id })
                .populate("slots")
                .exec((err, appointment) => res.json(appointment));

        });
    }
};
module.exports = appointmentController;