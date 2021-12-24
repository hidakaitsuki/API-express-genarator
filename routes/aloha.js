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
router.get("/", function (req, res) {
    const itemmodel = mongoose.model("items", itemSchema);
    itemmodel.find({}, function (error, result) {
        res.send(result[0]);
    });
});
const itemdetailSchema = mongoose.Schema({ items: Object });

// 商品詳細
router.post("/detail", function (req, res) {
    const itemdetail = new itemdetailmodel();
    itemdetail.items = req.body.item;
    itemdetail.save();
});

router.get("/detail/:id", function (req, res) {
    const itemdetailSchema = mongoose.Schema({
        _id: String,
        items: Object,
        __v: Number,
    });
    const itemdetailmodel = mongoose.model("itemdetails", itemdetailSchema);

  itemdetailmodel.find({"items.id":Number(req.params.id)}, function (err, result) {
    res.send(result);
  });
});

module.exports = router;
