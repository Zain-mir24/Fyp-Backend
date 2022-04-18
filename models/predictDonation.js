const mongoose = require("mongoose")
const MonthlySchema = new mongoose.Schema({

    Monthly: {
        type: String,
        required: true
    },
    Donation: {
        type: Number,
        required: true
    }

})
const MonthlyPrediction = mongoose.model("MonthlyPreidctionAnalysis", MonthlySchema)
module.exports = MonthlyPrediction