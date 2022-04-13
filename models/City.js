const mongoose = require("mongoose")
const CitySchema = new mongoose.Schema({

    City: {
        type: String,
        required: true
    },
    Donation: {
        type: String,
        required: true
    }

})
const City = mongoose.model("CityAnalysis", CitySchema)
module.exports = City