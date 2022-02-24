const { Appointment, Slot } = require("../models/Appointment");
const slotController = {
    all(req, res) {
        // Returns all Slots
        Slot.find({})
            .exec((err, slots) => res.json(slots))
    }
};
module.exports = slotController;