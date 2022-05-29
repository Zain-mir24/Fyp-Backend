const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// mongoose
//   .connect(
//     "mongodb+srv://Zain:globalreach123@cluster0.myxr4.mongodb.net/Globalreach?retryWrites=true&w=majority",
mongoose
  .connect(
    "mongodb+srv://Zain:globalreach123@cluster0.myxr4.mongodb.net/Globalreach?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(`not connected`, e);
  });
module.exports = mongoose;
