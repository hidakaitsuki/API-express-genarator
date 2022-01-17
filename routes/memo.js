const { format } = require("date-fns");
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
  const register = new registermodel();
  //   全件取得した後、一番最後のIDを取得（自動採番）
  registermodel.find({}, function (err, result) {
    const register = new registermodel();
    // 配列の一番最後のID番号に＋1
    register.id = result[result.length - 1].id + 1;
    register.name = req.body.name;
    register.email = req.body.email;
    register.password = req.body.password;
    registermodel.find({ email: req.body.email }, function (err, resultemail) {
      if (resultemail.length === 0) {
        register.save();
        res.send({
          status: "success",
          data: req.body,
          message: "会員登録成功",
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
});

// ログインする
router.post("/login", function (req, res) {
  mongoose.connect(
    // herokuに登録した環境変数をもってくる「process.env.設定したkey」でもってこれる
    `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.bwr5d.mongodb.net/memo?retryWrites=true&w=majority`,
    () => {
      console.log("mongoDBに接続しました");
    }
  );
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
          data: result,
          message: "ログイン成功",
        });
      }
    }
  );
});
const memoSchema = mongoose.Schema({
  id: Number,
  title: String,
  contents: String,
  date: String,
  user: Object,
});

// メモ新規作成
router.post("/memo", function (req, res) {
  mongoose.connect(
    // herokuに登録した環境変数をもってくる「process.env.設定したkey」でもってこれる
    `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.bwr5d.mongodb.net/memo?retryWrites=true&w=majority`,
    () => {
      console.log("mongoDBに接続しました");
    }
  );
  const memomodel = mongoose.model("memo", memoSchema);
  //   全件取得した後、一番最後のIDを取得（自動採番）
  memomodel.find({}, function (err, result) {
    const memo = new memomodel();
    memo.id = result[result.length - 1].id + 1;
    memo.title = req.body.title;
    memo.contents = req.body.contents;
    memo.date = req.body.date,
    memo.user = req.body.user;
    memo.save();
    res.send({ status: "success", data: req.body });
  });
});
// ユーザーごとにメモを取得
router.get("/memo/:id", function (req, res) {
  mongoose.connect(
    // herokuに登録した環境変数をもってくる「process.env.設定したkey」でもってこれる
    `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.bwr5d.mongodb.net/memo?retryWrites=true&w=majority`,
    () => {
      console.log("mongoDBに接続しました");
    }
  );
  const memomodel = mongoose.model("memo", memoSchema);
  //   全件取得した後、一番最後のIDを取得（自動採番）
  memomodel.find({ "user.id": Number(req.params.id) }, function (err, result) {
    res.send(result.data);
  });
});

module.exports = router;
