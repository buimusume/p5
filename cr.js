//https://neutralx0.net/tools/dot3/
let flg;
let gazo;

function setup() {
  gazo = loadImage('img.png');
  flg = 0;
  createCanvas(400, 400);
}

function draw() {
  if (flg === 0) {
    let str = "";
    let __RGBA_BackGround = [255, 255, 255, 255]; //*
    let __RGBA_WALL = [128, 128, 128, 255]; //*E2E8E4
    let __RGBA_WALL_EDGE = [255, 204, 187, 255]; //*FFCCBB
    let __RGBA_SKY = [110, 181, 192, 255]; //*6EB5C0
    let __RGBA_LAND = [0, 108, 132, 255]; //*006C84
    let __RGBA_BackGround2 = [226, 232, 228, 255]; //*006C84
    for (let y = 0; y < gazo.height; y++) {
      str += "\n";
      for (let x = 0; x < gazo.width; x++) {
        let c = gazo.get(x, y);
        if (c.toString() === __RGBA_BackGround.toString()) {
          str += ".";
        } else if (c.toString() === __RGBA_BackGround2.toString()) {
          str += "_";
        } else if (c.toString() === __RGBA_WALL.toString()) {
          str += "*";
        } else if (c.toString() === __RGBA_WALL_EDGE.toString()) {
          str += "+";
        } else if (c.toString() === __RGBA_SKY.toString()) {
          str += "1";
        } else if (c.toString() === __RGBA_LAND.toString()) {
          str += "2";
        }
      }
    }

    console.log(str);
  } else {
    //console.log("a");
  }
  flg = 1;
}