var createError = require("http-errors");
var express = require("express");
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var adminRouter = require("./routes/admin");

var apirouter = require("./routes/User");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use("/User", apirouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
