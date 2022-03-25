const mongoose = require("mongoose");
const recoverySchema = new mongoose.Schema({
    Uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    cell: {
        type: String,
        required: true
    },
    DateofPurchase: {
        type: String,
        required: true
    },
    Installment: {
        type: String,
        required: true
    },
    TotalAmount: {
        type: Number,
        required: true
    },
    Recovery: [
        {
            Month: { type: String, required: true },
            amount: { type: Number, required: true },
            balance: { type: Number, required: true }
        },
    ],


})


const Recovery = mongoose.model("Recovery", recoverySchema);

module.exports = Recovery;
