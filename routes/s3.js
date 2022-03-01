var express = require("express");
var router = express.Router();
// awsを操作するライブラリ
var AWS = require("aws-sdk");
// 画像をアップロードに使うライブラリ
var multer = require("multer");
// multerで何をするかの定義
const upload = multer({ dest: "uploads/" });
// ファイルを操作するライブラリ（nodeに最初から入っている）
var fs = require("fs");

// 画像1枚の時
// ルーターの後にmulterの処理を書く
router.post("/", upload.single("image"), function (req, res) {
  // 上がってきたファイルはreq.fileに入っている
  const file = req.file;
  //  s3の情報記載
  const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  //  fsを利用してファイルをアップロードできる形にする
  const filestream = fs.createReadStream(file.path);

  //   これから追加するファイルの情報
  const params = {
    // バケット名
    Bucket: process.env.AWS_BUCKET_NAME,
    // 追加するファイル名（ファイルの中のfilenameでOK）
    Key: file.filename,
    // 追加するファイルのパス（fsで加工してから）
    Body: filestream,
    // 画像の形式（multipart/form-dataで全形式対応（jpeg.pdf....））
    ContentType: "multipart/form-data",
  };
  // S3にアップロード
  s3.upload(params, function (err, result) {
    // 結果のLocationに画像のURL記載されている
    res.send(result);
  });
});

// 複数の画像（1枚でも全て対応）
// upload.array("image", 3)で3枚まで
router.post("/img", upload.array("image", 3), async function (req, res) {
  // 上がってきたファイルはreq.filesに入っている
  const files = req.files;
  //  s3の情報記載
  const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  //   最後にまとめて送るための配列用意
  const urlArray = [];

  async function getUrls() {
    for (let file of files) {
      //  fsを利用してファイルをアップロードできる形にする
      const filestream = fs.createReadStream(file.path);

      //   これから追加するファイルの情報
      const params = {
        // バケット名
        Bucket: process.env.AWS_BUCKET_NAME,
        // 追加するファイル名（ファイルの中のfilenameでOK）
        Key: file.filename,
        // 追加するファイルのパス（fsで加工してから）
        Body: filestream,
        // 画像の形式（multipart/form-dataで全形式対応（jpeg.pdf....））
        ContentType: "multipart/form-data",
      };
      // S3にアップロード
      await s3
        .upload(params)
        .promise()
        .then((result) => {
          urlArray.push(result);
        });
    }
  }
  getUrls().then(() => {
    res.send(urlArray);
  });
});
module.exports = router;
