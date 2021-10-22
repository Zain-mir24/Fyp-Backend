const mongoose = require("mongoose");

<<<<<<< HEAD
mongoose.connect(
  "mongodb+srv://Zain:globalreach123@cluster0.myxr4.mongodb.net/Globalreach?retryWrites=true&w=majority",
  {
=======
mongoose.connect(process.env.MONGO_URL, {
>>>>>>> 5c9479178fe51fe46ed02621f25637e5feb509a2
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
