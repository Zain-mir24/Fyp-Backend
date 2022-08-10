var createError = require("http-errors");
var express = require("express");
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var adminRouter = require("./routes/admin");
var mainRouter = require("./routes/index");
var apirouter = require("./routes/User");
var beneficiaryRouter = require("./routes/Beneficiary");
var adminPanelRouter = require("./routes/adminPanel");
var conversationRouter = require("./routes/Conversation");
var messageRouter = require("./routes/Messages");

var user = require("./models/users");
var admin = require("./models/Admin");

var stripe = require("./routes/stripe-route");
var donation = require("./routes/Donation");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const io = require("socket.io")(4000, {
  allowEIO3: true,
  cors: {
    // origin: "http://localhost:3000",
    origin: true,
    credentials: true,
  },
});

let users = [];
const addUser = (userId, socketId) => {
  console.log("What is this");
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(
    users.find((user) => user.userId === userId),
    "this is what we are getting"
  );
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A User Connected");
  // Take userID and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users);
    io.emit("getUsers", users);
  });

  // Send And Get Messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(receiverId, "done");
    const user = getUser(receiverId);

    try {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } catch {
      console.log("receiver not logged in");
    }
  });

  // get name and send campaign notification
  socket.on("sendnotification", ({ name }) => {
    io.emit("getnotification", {
      name,
    });
  });

  // get name and send campaign notification
  socket.on("sendDonation", ({ userName, campaignname }) => {
    io.emit("getDonation", {
      userName,
      campaignname,
    });
  });

  // socket.on("sendAdminMessage", ({ senderId, receiverId, text }) => {
  //   const user = getUser(receiverId);
  //   // console.log(user.socketId, "HELLO WORKK");

  //   io.to(user.socketId).emit("getAdminMessage", {
  //     senderId,
  //     text,
  //   });
  // });
  // Disconnect Handling
  socket.on("disconnect", () => {
    console.log("Some One Has Left The Chat");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
// let corsOptions = {
//   origin: ["https://warm-bayou-94304.herokuapp.com/", "http://localhost:3000"],
// };

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/admin", adminRouter);
app.use("/User", apirouter);
app.use("/beneficiary", beneficiaryRouter);
app.use("/adminPanel", adminPanelRouter);
app.use("/stripe", stripe);
app.use("/donation", donation);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  try {
    next(createError(404));
  } catch (e) {
    console.log(e);
  }
});

//CREATE TABLE `globalreach`.`signup` ( `Firstname` VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL , `Lastname` VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL , `Email` VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL , `Password` VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL ) ENGINE = InnoDB;

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("error", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
