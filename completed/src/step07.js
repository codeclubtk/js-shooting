import "./styles.css";
import {
    app,
    init,
    keyboard,
    sprites,
    createSprite,
    removeSprite,
} from "./util.js";

// グローバル変数
let player;
let missile = null;

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
    let space = keyboard(" ");

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
    space.press = () => {
        console.log("fire!");
        fire();
    };
}

function gameLoop() {
    // 自機を動かす
    player.x += player.vx;
    player.x = Math.max(player.x, player.width / 2);
    player.x = Math.min(player.x, app.view.width - sprites.player.width / 2);

    // ミサイルを動かす
    if (missile !== null) {
        missile.y += missile.vy;
        missile.x += missile.vx;
        // ミサイルが画面外に出たら削除し、nullに初期化
        if (missile.y < 0) {
            removeSprite(missile);
            missile = null;
        }
    }
}

function fire() {
    if (missile === null) {
        missile = createSprite(sprites.missile);
        missile.x = player.x;
        missile.y = player.y - player.height / 2;
        missile.vy = -4;
        missile.vx = 0;
    }
}
