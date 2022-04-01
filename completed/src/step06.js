import "./styles.css";
import { init, keyboard, sprites, createSprite } from "./util.js";

// グローバル変数
let player;
let left = keyboard("ArrowLeft");
let right = keyboard("ArrowRight");

// 初期化
init(setUp, gameLoop);

function setUp() {
    // 自機のセットアップ
    player = createSprite(sprites.player);
    player.vx = 0;
    player.x = 160;
    player.y = 220;
}

function gameLoop() {
    // 自機を動かす
    let vx = 0;
    if (left.isDown) {
        vx = -4;
    } else if (right.isDown) {
        vx = 4;
    }
    player.x += vx;
}
