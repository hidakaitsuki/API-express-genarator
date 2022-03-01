var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// ここに新しく作りたいAPI追加

var memo = require("./routes/memo");
var s3 = require("./routes/s3");

// mongoDBを簡単に操作できる「mongoose」をインポート
var mongoose = require("mongoose");

const cors = require("cors");
var app = express();

// 環境変数を受けとる(.envファイル)
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// cors（アクセスを許可する仕組み）は下のAPIのuseよりも上にする
app.use(cors());

// ここの下に上で作ったAPI
app.use("/memo", memo);
app.use("/s3", s3);

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
  res.render("error");
});

module.exports = app;
