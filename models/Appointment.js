const mongoose = require("mongoose")

const slotSchema = new Schema({
    SlotTime: {
        type: String,
        required: true
    },
    SlotDate: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
})

export const Slot = mongoose.model("Slot", slotSchema)

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    slots: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)