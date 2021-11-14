import * as PIXI from "pixi.js";

// PIXIの初期設定
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

let textobj;

// 定数
export const loader = PIXI.Loader.shared;
export const sprites = {};
export let app = new PIXI.Application({
    width: 320,
    height: 240,
    backgroundColor: 0x000000,
});

export function init(setup, gameloop) {
    // appの登録
    document.body.appendChild(app.view);

    // spriteの読み込み
    loader.add("alien1", "./images/alien1.png", { crossOrigin: "anonymous" });
    loader.add("alien2", "./images/alien2.png", { crossOrigin: "anonymous" });
    loader.add("alien3", "./images/alien3.png", { crossOrigin: "anonymous" });
    loader.add("player", "./images/player.png", { crossOrigin: "anonymous" });
    loader.add("missile", "./images/missile.png", { crossOrigin: "anonymous" });
    loader.add("alien_missile", "./images/alien_missile.png", {
        crossOrigin: "anonymous",
    });
    loader.add("laser", "./images/laser.png", { crossOrigin: "anonymous" });
    loader.load((loader, resources) => {
        sprites.alien1 = new PIXI.Sprite(resources.alien1.texture);
        sprites.alien2 = new PIXI.Sprite(resources.alien2.texture);
        sprites.alien3 = new PIXI.Sprite(resources.alien3.texture);
        sprites.player = new PIXI.Sprite(resources.player.texture);
        sprites.missile = new PIXI.Sprite(resources.missile.texture);
        sprites.alien_missile = new PIXI.Sprite(
            resources.alien_missile.texture
        );
        sprites.laser = new PIXI.Sprite(resources.laser.texture);

        setup();

        //　スケジューラーの登録
        // app.ticker.add内のfunctionは1秒間に60回呼ばれます
        app.ticker.add(function (delta) {
            gameloop(delta);
        });
    });
}

export function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = (event) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = (event) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

export function createSprite(source_sprite) {
    let s = new PIXI.Sprite(source_sprite.texture);
    s.anchor.set(0.5);
    app.stage.addChild(s);
    return s;
}

export function removeSprite(source_sprite) {
    app.stage.removeChild(source_sprite);
}

export function showMessage(message) {
    textobj = new PIXI.Text(message, {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        align: "center",
    });
    textobj.position.x = app.view.width / 2;
    textobj.position.y = app.view.height / 2;
    textobj.anchor.set(0.5);
    app.stage.addChild(textobj);
}

export function hideMessage() {
    app.stage.removeChild(textobj);
}
