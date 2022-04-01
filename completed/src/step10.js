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
let frame = 0;
let alienMissiles = [];
let left = keyboard("ArrowLeft");
let right = keyboard("ArrowRight");
let space = keyboard(" ");

// 初期化
init(setUp, gameLoop);

function setUp() {
    // 自機のセットアップ
    player = createSprite(sprites.player);
    player.vx = 0;
    player.x = 160;
    player.y = 220;

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
    frame++;

    // 自機を動かす
    let vx = 0;
    if (left.isDown) {
        vx = -4;
    } else if (right.isDown) {
        vx = 4;
    }
    if (space.isDown) {
        console.log("fire!");
        fire();
    }
    player.x += vx;
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

    // エイリアンのミサイルを動かす
    for (let i = 0; i < alienMissiles.length; i++) {
        let alienMissile = alienMissiles[i];
        alienMissile.y += 2;
        if (alienMissile.y > app.view.height + alienMissile.height / 2) {
            removeSprite(alienMissile);
            alienMissiles.splice(i, 1);
            i -= 1;
        }
    }

    // エイリアンを動かす
    moveAliens();
    // エイリアンのミサイル発射
    alienFire();
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

function moveAliens() {
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        if (frame % 60 < 30) {
            alien.x += 1;
        } else {
            alien.x -= 1;
        }
    }
}

function alienFire() {
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        if (alienMissiles.length >= 3) return;
        if (Math.random() < 0.007) {
            let alienMissile = createSprite(sprites.alienMissile);
            alienMissile.x = alien.x;
            alienMissile.y = alien.y + alien.height / 2;
            alienMissiles.push(alienMissile);
        }
    }
}
