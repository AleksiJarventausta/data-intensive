var createError = require("http-errors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Promise = require("bluebird");
var mongoose = require("mongoose");
var passport = require("passport");
var cors = require("cors");
var imageRoute = require("./routes/images");
var userRoute = require("./routes/user");
var customerRoute = require("./routes/customer");
var app = express();
app.use(cors());
mongoose.Promise = Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// view engine setup

require("./config/passport")(passport);
app.use(passport.initialize());

app.use(logger("dev"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

app.use("/image", imageRoute);
app.use("/user", userRoute);
app.use("/customer", customerRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end("aaaaaaaaaaaaaaaa");
});

module.exports = app;
