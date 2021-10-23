const mongoose = require("mongoose");

<<<<<<< HEAD
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = mongoose;
=======
mongoose.connect('mongodb+srv://Zain:globalreach123@cluster0.myxr4.mongodb.net/Globalreach?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
module.exports=mongoose
>>>>>>> 2b58af37a89855885cbd0b0974db12c5d9e52c5a
