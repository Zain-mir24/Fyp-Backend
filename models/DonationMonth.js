const mongoose = require("mongoose");

const DonationMonthSchema = new mongoose.Schema({

    Month: {
        type: String,
        required: true
    },
    Donation: {
        type: Number,
        required: true
    }




})
const DonationMonth = mongoose.model("DonationperMonth", DonationMonthSchema)
module.exports = DonationMonth;