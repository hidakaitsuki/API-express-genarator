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

  const totalcount = registermodel.countDocuments();
  registermodel.find({ email: req.body.email }, function (err, result) {
    if (result.length === 0) {
      //   IDを自動採番するために今あるデータ数を取得
      const register = new registermodel();
      register.id = totalcount
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
              id: 1,
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
module.exports = router;
