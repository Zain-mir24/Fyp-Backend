const { Appointment, Slot } = require("../models/Appointment")

const appointmentController = {
    all(req, res) {
        // Returns all appointments
        Appointment.find({}).exec((err, appointments) => res.json(appointments));
    },
    create(req, res) {
        var requestBody = req.body;
        var newslot = new Slot({
            slot_time: requestBody.slot_time,
            slot_date: requestBody.slot_date,
            created_at: Date.now()
        });
        newslot.save();
        // Creates a new record from a submitted form
        var newappointment = new Appointment({
            name: requestBody.name,
            email: requestBody.email,

            slots: newslot._id
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