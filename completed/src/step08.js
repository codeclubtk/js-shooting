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
let aliens = [];

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

    // エイリアンのセットアップ
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 5; i++) {
            let alien;
            if (j === 0) {
                alien = createSprite(sprites.alien1);
            } else if (j === 1) {
                alien = createSprite(sprites.alien2);
            } else {
                alien = createSprite(sprites.alien3);
            }
            alien.x = 16 + i * 64;
            alien.y = 20 + j * 32;
            aliens.push(alien);
        }
    }
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
    // hit test
    hitTest();
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

function hitTest() {
    // ミサイルとエイリアンのあたり判定
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        if (
            missile !== null &&
            Math.abs(missile.x - alien.x) < 16 &&
            Math.abs(missile.y - alien.y) < 16
        ) {
            removeSprite(alien);
            // spliceは, 第1引数で指定したi番目の要素から第1引数で指定した1個の要素を取り除くという意味
            // aliens配列は、この操作の後aliens[0], aliens[1], ..., aliens[i-1], aliens[i+1], ...
            // となる
            // つまり、i番目の要素が取り除かれる
            aliens.splice(i, 1);

            removeSprite(missile);
            missile = null;
        }
    }
}
