const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})
const notification = mongoose.model("Notification", notificationSchema)
module.exports = notification;