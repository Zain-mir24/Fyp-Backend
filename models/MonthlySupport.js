const mongoose = require("mongoose");
const MonthlySchema = new mongoose.Schema({
    bid: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    cnic: {
        type: Number,
        required: true
    }, category: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    NativeTown: {
        type: String,
        required: true
    },
    Accomodation: {
        self: {
            type: String,
        },
        donated: {
            type: String,
        },
        rental: {
            type: String,
        },
        rent: {
            type: String,
        }
    }, Sourceofincome: {
        type: String,
        required: true
    },
    Totalincome: {
        type: Number,
        required: true
    }, Totalexpenses: {
        type: Number,
        required: true
    }, Debt: {
        type: String
    },
    Assets: {
        nisab: {
            type: String,
        },
        bankdeposit: {
            type: String,
        },
        ornaments: {
            type: String,
        },
        otherassets: {
            type: String,
        }
    },
    widowfamdetail: [{
        name: {
            type: String
        },
        age: {
            type: Number
        },
        relation: {
            type: String
        },
        activities: {
            type: String
        },
        income: {
            type: Number
        }
    }],

    medicineCost: {
        type: Number,
        required: true
    },
    bform: {
        type: String,
        required: true
    },
    deathcertificate: {
        type: String,
    },
    totalamountdonation: {
        type: Number,
        required: true
    }

})
const Monthly = mongoose.model("MonthlySupport", MonthlySchema);

module.exports = Monthly;