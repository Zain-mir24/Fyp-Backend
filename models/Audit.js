// We will have 1 array type of subadmins and they will be assigned 
//multiple campaigns, Multiple campaigns array will have a pdf for them.
// The assign will be done by super admin.
const mongoose = require("mongoose")
const auditSchema = new mongoose.Schema({
    auditTeamname: {
        type: String,
        required: true
    },
    subAdmins: {
        type: [
            {
                Sid: {
                    type: mongoose.Types.ObjectId,
                    ref: "Admin"
                },
                Sid2: {
                    type: mongoose.Types.ObjectId,
                    ref: "Admin"
                },
                Sid3: {
                    type: mongoose.Types.ObjectId,
                    ref: "Admin"
                }
            }]
    },

    Cid: {
        type: mongoose.Types.ObjectId,
        ref: "campaigns"
    },
    fileName: {
        type: String
    }




})

const Audit = mongoose.model("Audit", auditSchema)
module.exports = Audit;
