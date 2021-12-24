var express = require("express");
var router = express.Router();
// https://api-rks-generator.herokuapp.com/aloha
const mongoose = require("mongoose");

mongoose.connect(
  // herokuに登録した環境変数をもってくる「process.env.設定したkey」でもってこれる
  `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.bwr5d.mongodb.net/aloha?retryWrites=true&w=majority`,
  () => {
    console.log("mongoDBに接続しました");
  }
);
const itemSchema = mongoose.Schema(
  { items: Array },
  { totalItemCount: Number }
);

// 商品一覧
const itemmodel = mongoose.model("items", itemSchema);
router.post("/", function (req, res) {
  const items = new itemmodel();
  items.items = req.body.items;
  items.totalItemCount = req.body.totalItemCount;
  items.save();
});
const itemdetailSchema = mongoose.Schema({ items: Array });
router.get("/", function (req, res) {
  const itemmodel = mongoose.model("items", itemSchema);
  itemmodel.find({}, function (error, result) {
    res.send(result[0]);
  });
});

// 商品詳細
const itemdetailmodel = mongoose.model("itemdetails", itemdetailSchema);
router.post("/detail", function (req, res) {
  const itemdetail = new itemdetailmodel();
  itemdetail.items = req.body.item;
  itemdetail.save();
});

module.exports = router;
