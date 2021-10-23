const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log(`successfully connected`);
    }).catch((e)=>{
    console.log(`not connected`,e);
    })
module.exports=mongoose