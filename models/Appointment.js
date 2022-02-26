const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    SlotTime: {
        type: String,
        required: true
    },
    SlotDate: {
        type: String,
        required: true
    },
    // The kid for which the appointment is for
    childId: {
        type: mongoose.Types.ObjectId,
        ref: "childrenSchema"
    },
    created_at: {
        type: Date,
        required: true
    }
})

const Appointment = mongoose.model("Appointment", appointmentSchema)
module.exports = {
    Appointment,

}