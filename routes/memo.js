var express = require("express");
var router = express.Router();
// ローカルのときは3000番
// http://localhost:3000
// https://api-rks-generator.herokuapp.com/memo
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
});

// 会員登録
router.post("/register", function (req, res) {
    mongoose.connect(
      // herokuに登録した環境変数をもってくる「process.env.設定したkey」でもってこれる
      `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.bwr5d.mongodb.net/memo?retryWrites=true&w=majority`,
      () => {
        console.log("mongoDBに接続しました");
      }
    );
  const registermodel = mongoose.model("registers", userSchema);
  const totalcount = 0;
    registermodel.find().count(function (err, result) {
      totalcount = result;
    });
  const register = new registermodel();
  register.id = totalcount + 1;
  register.name = req.body.name;
  register.email = req.body.email;
  register.password = req.body.password;
  register.save();
  res.send({
    status: "success",
    data: req.body,
    message: "会員登録成功",
  });
});

// ログインする
router.post("/login", function (req, res) {
  const loginmodel = mongoose.model("register", userSchema);
  loginmodel.find(
    { email: req.body.email, password: req.body.password },
    function (err, result) {
      if (result.length === 0) {
        res.send({
          status: "error",
          data: req.body,
          message: "パスワードとアドレスが一致しません",
        });
      } else {
        res.send({
          status: "success",
          data: req.body,
          message: "ログイン成功",
        });
      }
    }
  );
});

// 注文する
const orderSchema = mongoose.Schema({
  id: Number,
  userId: Number,
  totalPrice: Number,
  destinationName: String,
  destinationEmail: String,
  destinationZipcode: String,
  destinationAddress: String,
  destinationTel: String,
  deliveryTime: String,
  paymentMethod: Number,
  orderItemFormList: Array,
});
router.post("/order", function (req, res) {
  const ordermodel = mongoose.model("order", orderSchema);

  //   IDを自動採番するために今あるデータ数を取得
  let totalcount = 0;
  ordermodel.countDocuments(function (err, result) {
    totalcount = result;
  });

  const order = new ordermodel();
  order.id = totalcount + 1;
  order.userId = req.body.userId;
  order.totalPrice = req.body.totalPrice;
  order.destinationName = req.body.destinationName;
  order.destinationEmail = req.body.destinationEmail;
  order.destinationZipcode = req.body.destinationZipcode;
  order.destinationAddress = req.body.destinationAddress;
  order.destinationTel = req.body.destinationTel;
  order.deliveryTime = req.body.deliveryTime;
  order.paymentMethod = req.body.paymentMethod;
  order.orderItemFormList = req.body.orderItemFormList;
  order.save();
  res.send({ status: "success", data: req.body });
});

// 注文履歴を表示
router.post("/order/:id", function (req, res) {
  const ordermodel = new mongoose.model("order", orderSchema);
  ordermodel.find({ userId: req.params.id }, function (err, result) {
    res.send(result);
  });
});

module.exports = router;
