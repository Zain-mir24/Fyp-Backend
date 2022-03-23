const mongoose = require("mongoose");
const masjidSchema = new mongoose.Schema({
    Uid: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    Donation: {
        type: [
            {
                Date: {
                    type: String,
                    required: true
                },
                credited: {
                    type: Number
                },
                debited: {
                    type: Number
                },
                balance: {
                    type: Number,
                    required: true
                },
                Remarks: {
                    type: String
                }
            }
        ]
    }
    ,

})
const Masjid = mongoose.model("masjidScheme", masjidSchema);

module.exports = Masjid;