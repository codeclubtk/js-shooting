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
let missiles = [];
let alien_missiles = [];
let frame = 0;
let counter = 0;
let gameover = false;
let gameclear = false;

// 初期化
init(setup, gameloop);

// setupは最初に1回だけ呼ばれます
// ここでキーボード入力受付の処理を登録します
// 自機やエイリアンのセットアップも行います
function setup() {
    // 自機のセットアップ
    player = createSprite(sprites.player);

    // キーボード入力受付
    let left = keyboard("ArrowLeft");
    let right = keyboard("ArrowRight");
    let space = keyboard(" ");
    let z_key = keyboard("z");
    let x_key = keyboard("x");

    left.press = () => {
        player.vx = -4;
    };
    right.press = () => {
        player.vx = 4;
    };
    space.press = () => {
        console.log("fire!");
        fire();
    };
    z_key.press = () => {
        console.info("3-way!");
        fire_3way();
    };
    x_key.press = () => {
        console.info("laser!");
        fire_laser();
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

    reset_game();
}

// ここで各種チェック、処理を行います
// gameloop1秒間に60回呼ばれます
function gameloop(delta) {
    frame++;
    frame = frame % 8000000000; // frameが大きくなりすぎたら0に戻す

    if (gameover || gameclear) {
        counter++;
        if (counter > 180) {
            reset_game();
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
    for (let i = 0; i < alien_missiles.length; i++) {
        let alien_missile = alien_missiles[i];
        alien_missile.y += 2;
        if (alien_missile.y > app.view.height + alien_missile.height / 2) {
            alien_missiles.splice(i, 1);
            removeSprite(alien_missile);
            i -= 1;
        }
    }

    // エイリアンを動かす
    move_aliens();
    // エイリアンのミサイル発射
    alien_fire();
    // hit test
    hitTest();
}

function reset_game() {
    frame = 0;
    player.vx = 0;

    // ミサイルのリセット
    for (let i = 0; i < missiles.length; i++) {
        let missile = missiles[i];
        removeSprite(missile);
    }
    missiles = [];

    // エイリアンのミサイルのリセット
    for (let i = 0; i < alien_missiles.length; i++) {
        let alien_missile = alien_missiles[i];
        removeSprite(alien_missile);
    }
    alien_missiles = [];

    // エイリアンのリセット
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        removeSprite(alien);
    }
    aliens = [];

    // 自機のセット
    player.x = 160;
    player.y = 220;
    player.vx = 0;

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

function fire() {
    if (missiles.length < 3) {
        let missile = createSprite(sprites.missile);
        missile.x = player.x;
        missile.y = player.y - player.height / 2;
        missile.vy = -4;
        missile.vx = 0;
        missile.kind = "missile";
        missiles.push(missile);
    }
}

function fire_3way() {
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

function fire_laser() {
    if (missiles.length < 3) {
        let missile = createSprite(sprites.laser);
        missile.x = player.x;
        missile.y = player.y - player.height / 2;
        missile.vy = -4;
        missile.vx = 0;
        missile.kind = "laser";
        missiles.push(missile);
    }
}

function move_aliens() {
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        if (frame % 60 < 30) {
            alien.x += 2;
        } else {
            alien.x -= 2;
        }
    }
}

function alien_fire() {
    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        if (alien_missiles.length >= 3) return;
        if (Math.random() < 0.007) {
            let alien_missile = createSprite(sprites.alien_missile);
            alien_missile.x = alien.x;
            alien_missile.y = alien.y + alien.height / 2;
            alien_missiles.push(alien_missile);
        }
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

    if (aliens.length === 0) {
        gameclear = true;
        showMessage("Clear");
        return;
    }

    // エイリアンのミサイルと自機の当たり判定
    for (let i = 0; i < alien_missiles.length; i++) {
        let alien_missile = alien_missiles[i];
        if (
            Math.abs(alien_missile.x - player.x) < 16 &&
            Math.abs(alien_missile.y - player.y) < 16
        ) {
            gameover = true;
            showMessage("Game Over");
        }
    }
}
