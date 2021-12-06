const mongoose = require('mongoose')

const campaignSchema =  new mongoose.Schema({
    header:{
        type:String,
        required:true

    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }, file: {
        type: String,
        required:true
      },
})
const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign