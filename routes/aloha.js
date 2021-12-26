var express = require("express");
var router = express.Router();
// ローカルのときは3000番
// http://localhost:3000
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

// 商品詳細
router.post("/detail", function (req, res) {
  const itemdetail = new itemdetailmodel();
  itemdetail.items = req.body.item;
  itemdetail.save();
});

const itemdetailSchema = mongoose.Schema({
  _id: String,
  item: Object,
  __v: Number,
});
router.get("/detail/:id", function (req, res) {
  const itemdetailmodel = mongoose.model("itemdetails", itemdetailSchema);

  itemdetailmodel.find(
    { "item.id": Number(req.params.id) },
    function (err, result) {
      res.send(result[0]);
    }
  );
  itemdetailmodel.find({});
});

// 会員登録
const registerSchema = mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  zipcode: String,
  address: String,
  telephone: String,
});
router.post("/register", function (req, res) {
  const registermodel = mongoose.model("register", registerSchema);

  //   IDを自動採番するために今あるデータ数を取得
  let totalcount = 0;
  registermodel.countDocuments(function (err, result) {
    totalcount = result;
  });
  registermodel.find({ email: req.body.email }, function (err, result) {
    if (result.length === 0) {
      const register = new registermodel();
      register.id = totalcount + 1;
      register.name = req.body.name;
      register.email = req.body.email;
      register.password = req.body.password;
      register.zipcode = req.body.zipcode;
      register.address = req.body.address;
      register.telephone = req.body.telephone;
      register.save();

      res.send({
        status: "success",
        data: req.body,
      });
    } else {
      //  アドレスが既に登録済みの場合はエラーにする
      res.send({
        status: "error",
        data: req.body,
        message: "そのメールアドレスは既に登録済みです",
      });
    }
  });
});
// ログインする
router.post("/login", function (req, res) {
  const loginmodel = mongoose.model("register", registerSchema);
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
          responseMap: {
            user: {
              id: result[0].id,
              name: result[0].name,
              email: result[0].email,
              password: "**********",
              zipcode: result[0].zipcode,
              address: result[0].address,
              telephone: result[0].telephone,
              admin: false,
            },
          },
        });
      }
    }
  );
});

// 注文する
const orderSchema =mongoose.Schema({
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
  orderItemFormList: String,
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
