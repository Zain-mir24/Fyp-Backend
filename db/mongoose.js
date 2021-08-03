const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:globalreach123@cluster0.kdgc0.mongodb.net/Test",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
