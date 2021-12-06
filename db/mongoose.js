const mongoose = require("mongoose");

// mongoose
//   .connect(
//     "mongodb+srv://Zain:globalreach123@cluster0.myxr4.mongodb.net/Globalreach?retryWrites=true&w=majority",
mongoose
  .connect(
    "mongodb://Zain:globalreach123@cluster0-shard-00-00.myxr4.mongodb.net:27017,cluster0-shard-00-01.myxr4.mongodb.net:27017,cluster0-shard-00-02.myxr4.mongodb.net:27017/Globalreach?ssl=true&replicaSet=atlas-nwp4ia-shard-0&authSource=admin&retryWrites=true&w=majority",
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
