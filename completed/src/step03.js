import "./styles.css";
import { init } from "./util.js";

// 初期化
init(setUp, gameLoop);

function setUp() {
    // Step 03
    console.log("hello");

    // 変数
    let x = 3;
    console.log(x);

    x = x + 1;
    console.log(x);

    let a = 10;
    let b = 2;
    let c = a + b;
    console.log(c);

    let d = 123.45;
    let s = "hello";
    console.log(d);
    console.log(s);

    // 文字列と文字列以外の+
    console.log(d + s);

    // if
    let x1 = 3;
    let x2 = 4;

    if (x1 === 3) {
        console.log("x1 is 3");
    } else {
        console.log("x1 is not 3");
    }

    if (x2 === 3) {
        console.log("x2 is 3");
    } else {
        console.log("x2 is not 3");
    }

    let x3 = 3;
    let s3 = "3";
    if (x3 == s3) {
        console.log("==");
    } else {
        console.log("not ==");
    }
    if (x3 === s3) {
        console.log("===");
    } else {
        console.log("not ===");
    }

    // for
    for (let x4 = 1; x4 <= 3; x4 = x4 + 1) {
        console.log("x4=" + x4);
    }

    for (let x4 = 1; x4 <= 3; x4++) {
        console.log("x4=" + x4);
    }

    // array

    let a1 = [3, 5, 9];
    console.log(a1[0]);
    console.log(a1[1]);
    console.log(a1[2]);

    for (let i = 0; i <= 2; i++) {
        console.log("a1[" + i + "]=" + a1[i]);
    }

    a1[1] = 100;

    for (let i = 0; i <= 2; i++) {
        console.log("a1[" + i + "]=" + a1[i]);
    }

    // dirctionary

    let d1 = { apple: 3, orange: 5 };
    console.log(d1);
    console.log(d1["apple"]);
    console.log(d1["orange"]);

    d1["apple"] = 100;
    console.log(d1["apple"]);

    for (let [k, v] of Object.entries(d1)) {
        console.log("k=" + k + ", v=" + v);
    }

    // function
    let f1 = 10;
    let f2 = 20;
    let f3 = myadd(f1, f2);
    console.log(f3);

    // array assign
    a1 = [];
    for (let i = 0; i < 100; i++) {
        a1[i] = i;
    }
}

function myadd(a, b) {
    return a + b;
}

function gameLoop() {}
