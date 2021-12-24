var express = require("express");
var router = express.Router();
// https://api-rks-generator.herokuapp.com/aloha

router.post("/", function (req, res) {
  const test = req.body;
  console.log(test);
  // console.dir("bodyの中身" + JSON.stringify(req));
  // res.setHeader("Content-Type", "application/json; charset=utf-8");
  // res.set("Access-Control-Allow-Origin", "*");
  res.send("test");
});
