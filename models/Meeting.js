const mongoose = require("mongoose");
const meetingSchema=new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    email:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    // The kid for which the appointment is for
    childId:{
        type: mongoose.Types.ObjectId,
         ref:"childrenSchema"
    }
})


const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
