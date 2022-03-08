const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
    Project: {
        type: String,
        required: "true",
    },
    Location: {
        type: String,
        required: true,
    },
    Caretaker: {
        type: String,
        required: true,
    },
    Cellno: {
        type: Number,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    Material: [
        {
            name: { type: String, required: true },
            AU: { type: String, required: true },
            QTY: { type: Number, required: true },
            Rate: { type: Number, require: true },
            Cost: { type: Number, reqired: true },
        },
    ],
    LabourCharges: [{
        name: {
            type: String,
            required: true
        },
        Cellno: {
            type: Number,
            required: true,
        },
        natureofwork: { type: String, required: true },
        LabourCharges: { type: Number, required: true }
    }],
    MaterialTotal: {
        type: Number,
        required: true,
    },
    LabourTotal: {
        type: Number,
        required: true,
    }
})

const Expense = mongoose.model("Expense Schema", ExpenseSchema);

module.exports = Expense;