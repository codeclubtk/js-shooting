import "./styles.css";
import { app, init, keyboard, sprites, createSprite } from "./util.js";

// グローバル変数
let player;

// 初期化
init(setUp, gameLoop);

function setUp() {
    // 自機のセットアップ
    player = createSprite(sprites.player);
    player.vx = 0;
    player.x = 160;
    player.y = 220;

    // キーボード入力受付
    let left = keyboard("ArrowLeft");
    let right = keyboard("ArrowRight");

    left.press = () => {
        player.vx = -4;
    };
    right.press = () => {
        player.vx = 4;
    };
    left.release = () => {
        if (player.vx === -4) {
            player.vx = 0;
        }
    };
    right.release = () => {
        if (player.vx === 4) {
            player.vx = 0;
        }
    };
}

function gameLoop() {
    // 自機を動かす
    player.x += player.vx;
    player.x = Math.max(player.x, player.width / 2);
    player.x = Math.min(player.x, app.view.width - sprites.player.width / 2);
}
