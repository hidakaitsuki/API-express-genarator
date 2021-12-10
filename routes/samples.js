var express = require("express");
var router = express.Router();

/* サンプルAPI①
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get("/", function (req, res, next) {
  var param = {
    sample: "これはサンプルAPIです",
    array: [1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
    test: [test, test, test],
  };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(param);
});

/* サンプルAPI②
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get("/hello", function (req, res, next) {
  var param = { result: "Hello World !", test: [1, 2, 3, 4, 5, 6, 7, 8, 8, 0] };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(param);
});
router.get("/test", function (req, res, next) {
    var param = { result: "Hello World !", test: [1, 2, 3, 4, 5, 6, 7, 8, 8, 0],test1:[1,1,1,1,1,1,1,1,1,1,1] };
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(param);
  });



  router.get("/test1", function (req, res, next) {
    var param = {
      sample: "これはサンプルAPIです!!!!!!!!!",
      array: [1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
      test: [test, test, test],
    };
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(param);
  });
module.exports = router;
