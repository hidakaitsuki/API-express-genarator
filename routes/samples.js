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
  //   res.header("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(req.body);
});

/* サンプルAPI②
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post("/hello", function (req, res, next) {
  const { name, email, password } = req.body;
  res.header("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(param);
});

router.get("/pokemon", function (req, res, next) {
  const param = {
    items: [
      {
        item1: {
          name: "こんごうだま",
          effect:
            "ディアルガに持たせると、ドラゴンとはがねタイプのわざの威力が上がる",
        },
      },
      {
        item2: {
          name: "しらたま",
          effect:
            "パルキアに持たせると、ドラゴンとみずタイプのわざの威力が上がる",
        },
      },
      {
        item3: { name: "しろいハーブ", effect: "能力が下がったとき元に戻る" },
      },
      {
        item4: { name: "せんせいのツメ", effect: "先に攻撃できる" },
      },
      {
        item5: { name: "メンタルハーブ", effect: "メロメロ状態がなおる" },
      },
      {
        item6: {
          name: "メタルコート",
          effect: "はがねタイプのわざの威力が上がる",
        },
      },
      {
        item7: {
          name: "おうじゃのしるし",
          effect: "ダメージわざを使うと、相手をひるませることがある",
        },
      },
      {
        item8: { name: "ぎんのこな", effect: "むしタイプのわざの威力が上がる" },
      },
      {
        item9: {
          name: "おまもりこばん",
          effect: "持たせたポケモンが戦闘にでると、お金が2倍になる",
        },
      },
      {
        item10: {
          name: "きよめのおふだ",
          effect: "先頭のポケモンに持たせると、野生ポケモンと遭遇しづらくなる",
        },
      },
      {
        item11: {
          name: "けむりだま",
          effect: "野生のポケモンから必ず逃げられる",
        },
      },
      {
        item12: {
          name: "メタルコート",
          effect: "はがねタイプのわざの威力が上がる",
        },
      },
      {
        item13: {
          name: "たべのこし",
          effect: "ターン毎にHPが少しだけ回復する",
        },
      },
      {
        item14: {
          name: "でんきだま",
          effect: "ピカチュウに持たせると、攻撃と特攻が2倍になる",
        },
      },
      {
        item15: {
          name: "やわらかいすな",
          effect: "じめんタイプのわざの威力が上がる",
        },
      },
      {
        item16: {
          name: "かたいいし",
          effect: "いわタイプのわざの威力が上がる",
        },
      },
      {
        item17: {
          name: "きせきのタネ",
          effect: "くさタイプのわざの威力があがる",
        },
      },
      {
        item18: {
          name: "くろいメガネ",
          effect: "あくタイプのわざの威力が上がる",
        },
      },
      {
        item19: {
          name: "くろおび",
          effect: "かくとうタイプのわざの威力が上がる",
        },
      },
      {
        item20: {
          name: "じしゃく",
          effect: "でんきタイプのわざの威力が上がる",
        },
      },
      {
        item21: {
          name: "しんぴのしずく",
          effect: "みずダイプのわざの威力が上がる",
        },
      },
      {
        item22: { name: "どくバリ", effect: "どくタイプのわざの威力が上がる" },
      },
      {
        item23: {
          name: "とけないこおり",
          effect: "こおりタイプのわざの威力が上がる",
        },
      },
      {
        item24: {
          name: "のろいのおふだ",
          effect: "ゴーストタイプのわざの威力が上がる",
        },
      },
      {
        item25: {
          name: "まがったスプーン",
          effect: "エスパータイプのわざの威力が上がる",
        },
      },
      {
        item26: {
          name: "シルクのスカーフ",
          effect: "ノーマルタイプのわざの威力が上がる",
        },
      },
      {
        item27: {
          name: "かいがらのすず",
          effect: "与えたダメージの8分の1のHPが回復する",
        },
      },
      {
        item28: {
          name: "うしおのおこう",
          effect: "みずタイプのわざの威力が上がる",
        },
      },
      {
        item29: {
          name: "あかいバンダナ",
          effect: "かっこよさコンテストの評価が上がる",
        },
      },
      {
        item30: {
          name: "あおいバンダナ",
          effect: "うつくしさコンテストの評価が上がる",
        },
      },
      {
        item31: {
          name: "ピンクのバンダナ",
          effect: "かわいさコンテストで評価が上がる",
        },
      },
      {
        item32: {
          name: "みどりのバンダナ",
          effect: "かしこさコンテストで評価が上がる",
        },
      },
      {
        item33: {
          name: "きいろのバンダナ",
          effect: "たくましさコンテストで評価が上がる",
        },
      },
      {
        item34: { name: "こうかくレンズ", effect: "命中率が上がる" },
      },
      {
        item35: {
          name: "ものしりメガネ",
          effect: "とくしゅわざの威力が上がる",
        },
      },
      {
        item36: {
          name: "たつじんのおび",
          effect: "「こうかばつぐん」のとき、わざの威力が上がる",
        },
      },
      {
        item37: {
          name: "きあいのタスキ",
          effect: "HP満タンからひんしになる攻撃を受けてもHPが1残る",
        },
      },
      {
        item38: {
          name: "ひかりのねんど",
          effect: "「リフレクター」「ひかりのかべ」を使うと効果が長くなる",
        },
      },
      {
        item39: {
          name: "フォーカスレンズ",
          effect: "相手よりも行動が遅かった場合、わざの命中率が上がる",
        },
      },
      {
        item40: {
          name: "メトロノーム",
          effect: "同じわざを連続で使うと威力が上がる",
        },
      },
      {
        item41: {
          name: "くろいてっきゅう",
          effect:
            "すばやさが下がる。特性「ふゆう」、タイプ「ひこう」のポケモンでも、じめんタイプのわざが当たる",
        },
      },
      {
        item42: {
          name: "くろいヘドロ",
          effect:
            "持たせると、戦闘中にどくタイプのポケモンは少しずつHPが回復する。どくタイプ以外だとHPが減る。",
        },
      },
      {
        item43: {
          name: "つめたいいわ",
          effect:
            "「あられ」を使うと、天気があられ状態になっている時間が伸びる",
        },
      },
      {
        item44: {
          name: "さらさらいわ",
          effect:
            "「すなあらし」を使うと、天気がすなあらし状態になっている時間が伸びる",
        },
      },
      {
        item45: {
          name: "あついいわ",
          effect:
            "「にほんばれ」を使うと、天気がひざしがつよい状態になっている時間が伸びる",
        },
      },
      {
        item46: {
          name: "しめったいわ",
          effect:
            "「あまごい」を使うと、天気があめ状態になっている時間が伸びる",
        },
      },
      {
        item47: {
          name: "ねばりのかぎづめ",
          effect:
            "「しめつける」「まきつく」などでダメージを与えるターンが増える",
        },
      },
      {
        item48: {
          name: "くっつきバリ",
          effect: "毎ターンダメージを受ける。触れてきた相手に稀にくっつく",
        },
      },
      {
        item49: {
          name: "きれいなぬけがら",
          effect: "控えのポケモンと必ず交代できる",
        },
      },
      {
        item50: {
          name: "おおきなねっこ",
          effect: "HPを吸い取るわざで回復する量が増える",
        },
      },
      {
        item51: {
          name: "こだわりメガネ",
          effect: "同じわざしか出せなくなるが、とくこうが増加する",
        },
      },
      {
        item52: {
          name: "ひのたまプレート",
          effect: "ほのおタイプのわざの威力が上がる",
        },
      },
      {
        item53: {
          name: "しずくプレート",
          effect: "みずタイプのわざの威力が上がる",
        },
      },
      {
        item54: {
          name: "いかずちプレート",
          effect: "でんきタイプのわざの威力が上がる",
        },
      },
      {
        item55: {
          name: "みどりのプレート",
          effect: "くさタイプのわざの威力が上がる",
        },
      },
      {
        item56: {
          name: "つららのプレート",
          effect: "こおりタイプのわざの威力が上がる",
        },
      },
      {
        item57: {
          name: "こぶしのプレート",
          effect: "かくとうタイプのわざの威力が上がる",
        },
      },
      {
        item58: {
          name: "もうどくプレート",
          effect: "どくタイプのわざの威力が上がる",
        },
      },
      {
        item59: {
          name: "だいちのプレート",
          effect: "じめんタイプのわざの威力が上がる",
        },
      },
      {
        item60: {
          name: "あおぞらプレート",
          effect: "ひこうタイプのわざの威力が上がる",
        },
      },
      {
        item61: {
          name: "ふしぎのプレート",
          effect: "エスパータイプのわざの威力が上がる",
        },
      },
      {
        item62: {
          name: "たまむしプレート",
          effect:
            "むしのタイプの石石盤。持たせるとむしタイプの技の威力が強まる。",
        },
      },
      {
        item63: {
          name: "がんせきプレート",
          effect: "いわタイプのわざの威力が上がる",
        },
      },
      {
        item64: {
          name: "もののけプレート",
          effect: "ゴーストタイプのわざの威力が上がる",
        },
      },
      {
        item65: {
          name: "りゅうのプレート",
          effect: "ドラゴンタイプのわざの威力が上がる",
        },
      },
      {
        item66: {
          name: "こわもてプレート",
          effect: "あくタイプのわざの威力が上がる",
        },
      },
      {
        item67: {
          name: "こうてつプレート",
          effect: "はがねタイプのわざの威力が上がる",
        },
      },
      {
        item68: {
          name: "あやしいおこう",
          effect: "エスパータイプのわざの威力が上がる",
        },
      },
      {
        item69: {
          name: "がんせきおこう",
          effect: "いわタイプのわざの威力が上がる",
        },
      },
      {
        item70: { name: "まんぷくおこう", effect: "技の発動が後攻になる" },
      },
      {
        item71: {
          name: "さざなみのおこう",
          effect: "みずタイプのわざの威力が上がる",
        },
      },
      {
        item72: {
          name: "ひかりのこな",
          effect:
            "キラキラ光る粉。もたせると光が相手を惑わして技が命中しにくくなる。",
        },
      },
      {
        item73: {
          name: "もくたん",
          effect:
            "ものを燃やす燃料。持たせるとほのおタイプの技の威力があがる。",
        },
      },
      {
        item74: {
          name: "こだわりハチマキ",
          effect:
            "ちょっとこだわったハチマキ。持たせると攻撃はあがるが、同じ技しか出せなくなる。",
        },
      },
      {
        item75: {
          name: "こだわりスカーフ",
          effect:
            "ちょっとこだわったスカーフ。持たせると素早さはあがるが、同じ技しかだせなくなる。",
        },
      },
      {
        item76: {
          name: "あかいいと",
          effect:
            "細くて長い真っ赤な糸。持たせるとメロメロになったとき、相手もメロメロにできる。",
        },
      },
      {
        item77: {
          name: "りゅうのキバ",
          effect: "持たせると、ドラゴンタイプの技の威力が上がる。",
        },
      },
      {
        item78: {
          name: "かえんだま",
          effect:
            "触ると熱をだす不思議な玉。持たせると戦闘中にやけどの状態になる。",
        },
      },
      {
        item79: {
          name: "かるいし",
          effect: "とても軽い石。持たせるとポケモンの体重が軽くなる。",
        },
      },
    ],
  };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(param);
});

module.exports = router;
