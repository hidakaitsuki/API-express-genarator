var express = require("express");
var router = express.Router();
// https://api-rks-generator.herokuapp.com/aloha
const mongoose = require("mongoose");

mongoose.connect(
  // herokuに登録した環境変数をもってくる「process.env.設定したkey」でもってこれる
  `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.bwr5d.mongodb.net/login?retryWrites=true&w=majority`,
  () => {
    console.log("mongoDBに接続しました");
  }
);

router.post("/", function (req, res) {
  const test = req.body;
  console.log(test);
  // console.dir("bodyの中身" + JSON.stringify(req));
  // res.setHeader("Content-Type", "application/json; charset=utf-8");
  // res.set("Access-Control-Allow-Origin", "*");
  res.send("test");
});

module.exports = router;
