import "./styles.css";
import { init, sprites, createSprite } from "./util.js";

// 初期化
init(setUp, gameLoop);

function setUp() {
    let alien = createSprite(sprites.alien1);
    alien.position.x = 16;
    alien.position.y = 16;
}

function gameLoop() {}
