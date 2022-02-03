// Scheduling meeting for child adoption
const scheduleMeeting=async(req,res,next)=>{
const {appointmentDate,name,email} = req.body;
if(!appointmentDate || !name || !email){
    return res.status(400).json({
        message:'Appointment date, name and email are required'
    })
}
  const payload={appointmentDate,name,email};
  
}
module.exports={
    scheduleMeeting
}