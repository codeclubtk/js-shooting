import "./styles.css";
import { init, sprites, createSprite } from "./util.js";

// 初期化
init(setUp, gameLoop);

function setUp() {
    // 自機のセットアップ
    let player = createSprite(sprites.player);
    player.x = 160;
    player.y = 220;
}

function gameLoop() {}
