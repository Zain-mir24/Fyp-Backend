const mongoose = require("mongoose");
const childrenSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},  
age:{
    type:Number,
    required:true
},
gender:{
    type:String,
    required:true
},
DOB:{
    type:Date,
    required:true
},
POB:{
    type:String,
    required:true
},
disability:{
    type:String,
    required:true
}, 
fileName: {
    type: String,
    required: true,
  }

})
const Children = mongoose.model("childrenSchema", childrenSchema);

module.exports = Children ;
