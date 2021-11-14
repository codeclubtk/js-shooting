#  Javascript シューティングゲーム

## 目次
- [Javascript シューティングゲーム](#javascript-シューティングゲーム)
  - [目次](#目次)
  - [この教材について](#この教材について)
  - [手順](#手順)
    - [Step 00: CodeSandboxアカウントの登録](#step-00-codesandboxアカウントの登録)
    - [Step 01: Java Script と PIXI.jsの始まり](#step-01-java-script-と-pixijsの始まり)
      - [課題](#課題)
    - [Step 02: キャラクターを表示してみよう](#step-02-キャラクターを表示してみよう)
      - [課題](#課題-1)
    - [Step 03: Java Scriptについて](#step-03-java-scriptについて)
      - [課題](#課題-2)
    - [Step 04: 自機を表示しよう](#step-04-自機を表示しよう)
    - [Step 05: 矢印キーで自機を移動しよう](#step-05-矢印キーで自機を移動しよう)
    - [Step 06: 自機の移動範囲を制限して画面から出ないようにしよう](#step-06-自機の移動範囲を制限して画面から出ないようにしよう)
    - [Step 07: ミサイルを発射しよう](#step-07-ミサイルを発射しよう)
    - [Step 08: エイリアン（敵）を配置しよう](#step-08-エイリアン敵を配置しよう)
    - [Step 09: エイリアンを規則的に動かそう](#step-09-エイリアンを規則的に動かそう)
    - [Step 10: エイリアンもミサイルを打ってくるようにしよう](#step-10-エイリアンもミサイルを打ってくるようにしよう)
    - [Step 11: エイリアンの種類を増やそう](#step-11-エイリアンの種類を増やそう)
    - [Step 12: ゲームクリア/ゲームオーバー](#step-12-ゲームクリアゲームオーバー)
    - [Step 13: ミサイルを画面内3発まで発射できるようにしよう](#step-13-ミサイルを画面内3発まで発射できるようにしよう)
    - [Step 14: Zキーで3-wayミサイルを発射できるようにしよう](#step-14-zキーで3-wayミサイルを発射できるようにしよう)
    - [Step 15: Xキーでレーザーを発射できるようにしよう](#step-15-xキーでレーザーを発射できるようにしよう)
  - [さらに改良するには？](#さらに改良するには)
## この教材について

* これは「シューティングゲーム」の作り方を通してJava ScriptとPIXI.jsを学ぶための教材です
* この教材では[このCodeSandboxの教材](https://codesandbox.io/s/shooting-game-ijvy1)を使用します

## 手順

### Step 00: CodeSandboxアカウントの登録

- 初回はCodeSandboxにアカウントがないと思いますので、以下の手順でアカウントを作成しましょう
  - <https://codesandbox.io/>から`Sign In`を選択し、`Sign in with Google`を選択
  - 自分のGoogle Account用のパスワードを入力すると、`username`と`display name`を聞かれます
  - この名前は外部から見られますので、本名や本人が特定できる情報は入力しないでください
  - 入力したら、`Finish Sign Up`ボタンを押すと登録完了です
- 次回以降は今回作成したアカウントで`Sign In`（ログイン）できます

### Step 01: Java Script と PIXI.jsの始まり

- まずは[CodeSandboxの教材](https://codesandbox.io/s/shooting-game-ijvy1)を開いてみましょう
- Filesに進むと、以下のようなファイルが用意されています

![CodeSandbox](./images/CodeSandbox.png)

- `src`フォルダ内にある`index.js`を開いて、内容を全て以下のスクリプトで置き換えてください。同様の内容はCode Sandbox内の`step01.js`にも保存されています。
- Ctrl-Sでセーブすると、初回はForkするか聞かれますので、Yesと答えてください。
- Forkすると、初めに読み込み専用で開いたCode Sandoboxの教材スクリプトを全て自分の環境にコピーし、変更・セーブできるようになります。

```js
import "./styles.css";
import * as PIXI from "pixi.js";

// PIXIの初期設定
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

// PIXIのテスト
PIXI.utils.sayHello(type);

// appの作成
let app = new PIXI.Application({
  width: 320,
  height: 240,
  backgroundColor: 0x000000
});

// appの登録
document.body.appendChild(app.view);
```

- セーブするとブラウザの右側に黒い四角い背景が現れます
- これがこれから作成するゲーム画面になります
- この段階では、`import`や`let`, `if`, `PIXI.utils...`などは気にしないでください
- 以降のステップで必要な部分は解説します

![図01-1](./images/step01-1.png)

#### 課題

- 背景のサイズは320 x 240になっています。これを400 x 300にするとどうなるか確認してみよう
- 背景の色が0x000000で黒になっています。これはRGBのR(赤）が00, G(緑)が00, B(青)が00、全て0なので黒という意味です。これを赤にするにはどうすればいいでしょう？
  - ヒント:
  - R, G, Bの各要素は00, 01, 02, ... FFとなっていて、16進数で表されています
  - 16進数では, 01, 02, ..., 09の後は0A, 0B, 0C, ..., 0Fと続き、その後に10がきます。
  - 同様に10, 11, ..., 19, 1A, 1B, ..., 1F, 20, 21, ..., 29, 2A, 2B, ...と続きます
  - 16進数では、1バイト（=8ビット)で表すことのできる最大の数字はFF (10進数で255)になります

### Step 02: キャラクターを表示してみよう

- Spriteを1つ表示してみよう

#### 課題

- Spriteを回転させてみよう
- Spriteの位置を変えてみよう
- 複数のSpriteを表示してみよう
- 背景を白にしてみよう

### Step 03: Java Scriptについて

- 変数と型
- console.logの使い方
- `if`構文とは？
- `for`構文とは？
- `array`（配列）とはなんだろう？
  - `array`を使って複数の文字列を格納してみよう
  - `for`を使ってlistの中身を全て表示してみよう
  - index（インデックス）を使ってarrayの中身を表示してみよう
  - index（インデックス）を使ってarrayの中身を変更してみよう
- `dictionary`（辞書とはなんだろう）？
  - `dictionary`を使って複数の文字列を格納してみよう
  - `for`を使ってdictionaryの中身を全て表示してみよう
  - key（キー）を使ってdictionaryの中身を表示してみよう
  - key（キー）を使ってdictionaryの中身を変更してみよう

#### 課題

- `array`を作って、`for`を使ってそのarrayに1から100までの整数を格納してみよう
- 1から100まで格納したarrayを列挙（巡回）して、全ての数字を表示してみよう
- `dictionary`にいくつかのkey - valueペアを代入しよう
- その`dictionary`を列挙（巡回）して、全てのkey - valueペアを`console.log`してみよう

### Step 04: 自機を表示しよう

- まずは`init(setup, gameloop);`を呼んでゲームを初期化しよう
  - `setup`は最初に1回だけ呼ばれます
  - `gameloop`は1秒間に60回呼ばれます
  - `gameloop`の中でキーボードの状態を取得し、ゲームの進行を行います
- `player.png`を自機として表示してみよう
  - `setup`内で自機を作成してみよう
  - 事前に`sprites.player`, `sprites.alien1`, `sprites.missile`などが用意されています
  - 何が用意されているかは`util.js`の中の`init`関数を見てみよう
  - `util.js`に用意されている`createSprite`関数にsprite.*を渡すと、新しくそのスプライトが作成されます

```js
function setup() {
    // 自機のセットアップ
    player = createSprite(sprites.player);
    player.x = 320;
    player.y = 440;
}
```

- 画面サイズは幅640、高さ480にしよう
- 自機の初期表示位置は(320,400)にしよう

<!-- ![スクリーンショット](./docs/step04.png) -->

### Step 05: 矢印キーで自機を移動しよう

- キーボード入力は`util.js`内の`keyboard`を使用して取得します
- TBD

### Step 06: 自機の移動範囲を制限して画面から出ないようにしよう

- 自機が画面から出ないように、以下の処理を追加しよう
  - 自機が画面の左端よりも左に来たら、左端に戻す
  - 自機が画面の右端よりも右に来たら、右端に戻す
- 上記を行うには、以下のように書くことができます
  - `Math.max`を使って自機のX座標を現在の値と画面の左端のうち大きい方にする
  - `Math.min`を使って自機のX座標を現在の値と画面の右端のうち小さい方にする

```js
    player.x = Math.max(player.x, player.width / 2);
    player.x = Math.min(player.x, app.view.width - sprites.player.width / 2);
```

### Step 07: ミサイルを発射しよう

- スペースキーでミサイルを1発だけ発射できるようにしよう
- ミサイルが画面にないときはまたミサイルが発射でき、ミサイルが画面内にあるときは発射できないようにしよう
- ミサイルが発射されたら`missile`の位置を自機の位置あたりに設定し、`gameloop`内で位置を更新しよう
- ミサイルは画面の外に出たら消えるようにしよう

<!-- ![スクリーンショット](./docs/step08.png) -->

### Step 08: エイリアン（敵）を配置しよう

- 配列にエイリアンを格納し、表示しよう
- ミサイルが当たったらエイリアンを消去しよう
- ミサイルにあったかどうかの判定はミサイルとエイリアンのx, y座標の差の絶対値が32以下の場合としよう
- ここまでのステップで少しゲームとして遊べるようになります。

### Step 09: エイリアンを規則的に動かそう

- ここではエイリアンを右に2ドット x 30回、左に2ドット x 30回、また右に2ドット x 30回、...というように周期的に動かしましょう

### Step 10: エイリアンもミサイルを打ってくるようにしよう

- エイリアンもミサイルを打ってくるようにしよう
  - すでに3発のミサイルがエイリアンから画面内に発射されていたらそれ以上は発射しないようにしよう
  - Step09と同様に、`alien_missiles`を巡回中にその要素を削除してはいけないので、`alien_missiles[:]`（コピー）を巡回中に`alien_missiles`の要素を削除しよう

### Step 11: エイリアンの種類を増やそう

- 青いイリアンの下に赤いエイリアンの列、その下に緑のエイリアンの列を作ろう

### Step 12: ゲームクリア/ゲームオーバー

- エイリアンを全て倒したら`Clear`と表示しよう
- エイリアンのミサイルに自機が当たったら`Game Over`と表示しよう
- ゲームクリアもしくはゲームオーバーを3秒表示したら自動的にゲームを再開しよう

### Step 13: ミサイルを画面内3発まで発射できるようにしよう

- 配列を使用してミサイルを画面内3発まで発射できるようにしよう

### Step 14: Zキーで3-wayミサイルを発射できるようにしよう

### Step 15: Xキーでレーザーを発射できるようにしよう

## さらに改良するには？

- 右上にスコアを表示しましょう
- いきなりゲームが始まるのではなく、タイトル画面をつけるにはどうしたら良いでしょう
- どうやったらエイリアンを回転できるか調べてみましょう
- どうやったらエイリアンや自機をアニメーションできるか調べてみましょう