import "./styles.css";
import {
    app,
    init,
    keyboard,
    sprites,
    createSprite,
    removeSprite,
    showMessage,
    hideMessage,
} from "./util.js";

// グローバル変数
let player;
let aliens = [];
let frame = 0;
let alienMissiles = [];
let counter = 0;
let gameover = false;
let gameclear = false;
let missiles = [];

// 初期化
init(setUp, gameLoop);

function setUp() {
    // 自機のセットアップ
    player = createSprite(sprites.player);

    // キーボード入力受付
    let left = keyboard("ArrowLeft");
    let right = keyboard("ArrowRight");
    let space = keyboard(" ");
    let z_key = keyboard("z");

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
    z_key.press = () => {
        console.info("3-way!");
        fire3way();
    };

    resetGame();
}

function gameLoop() {
    frame++;

    if (gameover || gameclear) {
        counter++;
        if (counter > 180) {
            resetGame();
            counter = 0;
            gameover = false;
            gameclear = false;
            hideMessage();
        }
        return;
    }

    // 自機を動かす
    player.x += player.vx;
    player.x = Math.max(player.x, player.width / 2);
    player.x = Math.min(player.x, app.view.width - sprites.player.width / 2);

    // ミサイルを動かす
    for (let i = 0; i < missiles.length; i++) {
        let missile = missiles[i];
        missile.y += missile.vy;
        missile.x += missile.vx;
        if (missile.y < -missile.height) {
            missiles.splice(i, 1);
            removeSprite(missile);
            i -= 1;
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
    if (missiles.length < 3) {
        let missile = createSprite(sprites.missile);
        missile.x = player.x;
        missile.y = player.y - player.height / 2;
        missile.vy = -4;
        missile.vx = 0;
        missiles.push(missile);
    }
}

function hitTest() {
    // ミサイルとエイリアンのあたり判定
    for (let i = 0; i < aliens.length; i++) {
        for (let j = 0; j < missiles.length; j++) {
            let alien = aliens[i];
            let missile = missiles[j];
            if (
                Math.abs(missile.x - alien.x) < 16 &&
                Math.abs(missile.y - alien.y) < 16
            ) {
                aliens.splice(i, 1);
                removeSprite(alien);
                i -= 1;
                if (missile.kind === "missile") {
                    missiles.splice(j, 1);
                    removeSprite(missile);
                    j -= 1;
                }
                //　このalienは削除されたので、breakしてjのループを抜ける
                break;
            }
        }
    }

    // 残りエイリアンのカウント
    if (aliens.length === 0) {
        gameclear = true;
        showMessage("Clear");
        return;
    }

    // エイリアンのミサイルと自機の当たり判定
    for (let i = 0; i < alienMissiles.length; i++) {
        let alienMissile = alienMissiles[i];
        if (
            Math.abs(alienMissile.x - player.x) < 16 &&
            Math.abs(alienMissile.y - player.y) < 16
        ) {
            gameover = true;
            showMessage("Game Over");
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

function resetGame() {
    // エイリアンのミサイルのリセット
    for (let i = 0; i < alienMissiles.length; i++) {
        let alienMissile = alienMissiles[i];
        removeSprite(alienMissile);
    }
    alienMissiles = [];

    // エイリアンのリセット
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        removeSprite(alien);
    }
    aliens = [];

    // 自機のセット
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

function fire3way() {
    if (missiles.length > 0) {
        return;
    }

    for (let i = -2; i <= 2; i += 2) {
        let missile = createSprite(sprites.missile);
        missile.x = player.x;
        missile.y = player.y - player.height / 2;
        missile.vy = -4;
        missile.vx = i;
        missile.kind = "missile";
        missiles.push(missile);
    }
}
