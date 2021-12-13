var express = require("express");
var router = express.Router();

/* サンプルAPI①
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 *
 * herokuデプロイ済み
 * https://create-api-rks.herokuapp.com/samples
 *
 */
router.post("/", function (req, res) {
  var param = {
    sample: "これはサンプルAPIです",
    array: [1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
    test: ["test", "test", "test"],
  };
  res.header("Content-Type", 'text/plain');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(req.body);
});

/* サンプルAPI②
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post("/hello", function (req, res, next) {
  const {name,email,password}=req.body
  res.header("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(param);
});

module.exports = router;
