const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    caretaker: {
        type: String,
        required: true,
    },
    cellno: {
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
        labourname: {
            type: String,
            required: true
        },
        labourCellno: {
            type: Number,
            required: true,
        },
        natureofwork: {
            type: String,
            required: true
        },
        LabourChargesPaid: {
            type: Number,
            required: true
        }
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