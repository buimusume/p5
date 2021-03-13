// ※
// このような米印から始まるコメントは、自分のJavaScript+p5.jsの
// 入門講座を見たかた向けの補足です。

// ※
// 「引数 => 式」は、アロー関数式(arrow function expression)をあらわす。
// アロー関数式を用いると、関数を短く書ける。
// 例えば「let f = n => n*2;」 は、「function f(n) {return n*2;}」とほぼ同じ意味。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//
// アロー関数式では、引数がいらない場合は、アンダーバー _ を用いる。
// 例: let ans = _ => 42; //常に42を返す関数
// 
// また、「引数 => {式1;式2;式3;}」といった具合に、ブロックを用いると式を複数書ける。


/**
 * 2次元ベクトルのクラス
 */
 class Vec2 {
  /**
   * @param {number} x成分
   * @param {number} y成分
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * @param {Vec2} b 足したいベクトル
   */
  add(b) {
    let a = this;
    return new Vec2(a.x+b.x, a.y+b.y);
  }
  /**
   * @param {Vec2} b 引きたいベクトル
   */
  sub(b) {
    let a = this;
    return new Vec2(a.x-b.x, a.y-b.y);
  }
  /**
   * @param {number} s ベクトルにかけたい実数
   */
  mul(s) {
    return new Vec2(s*this.x, s*this.y);
  }
  /**
   * @param {number} s この実数でベクトルを割る
   */
  div(s) {
    return new Vec2(this.x/s, this.y/s);
  }
  /**
   * @param {Vec2} v このベクトルとドット積をとる
   */
  dot(b) {
    let a = this;
    return a.x*b.x + a.y*b.y;
  }
  /**
   * @returns ベクトルの大きさ（成分のユークリッド距離）
   */
  mag() {
    return sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * @param {number} rad 回転させたい角度。単位はラジアン。
   */
  rotate(rad) {
    return new Vec2(
      this.x*cos(rad) - this.y*sin(rad),
      this.x*sin(rad) + this.y*cos(rad)
    );
  }
  /**
   * @returns 正規化されたベクトル
   */
  norm() {
    return this.mul(1/this.mag());
  }
  copy() {
    return new Vec2(this.x, this.y);
  }
  /**
   * @param {Vec2} b このベクトルと成分が等しいか否かを返す
   */
  equals(b) {
    let a = this;
    return a.x === b.x && a.y === b.y;
  }
}

class Util {
  /**
   * 矢印を描画する
   * @param {Vec2} begin 始点の位置ベクトル
   * @param {Vec2} way 矢印の方向ベクトル
   */
  static drawArrow(begin, way, brimSize=20) {
    let end = begin.add(way);
    if (brimSize !== 0) {
      let b1 = way.norm().mul(-brimSize).rotate(PI/6);
      let b2 = b1.rotate(-2*PI/6);
      [b1,b2].forEach(brim => line(end.x, end.y, end.add(brim).x, end.add(brim).y));
    }
    line(begin.x, begin.y, end.x, end.y);
  }
  /**
   * 線分を描画する
   * @param {Vec2} begin 始点の位置ベクトル
   * @param {Vec2} way 始点から伸びる方向ベクトル
   */
  static drawLine(begin, way) {
    return Util.drawArrow(begin, way, 0);
  }
}

class Player {
  constructor() {
    this.pos = new Vec2(100, 200);
    this.angle = PI/3;
  }
}

class Level {
  constructor() {
    this.tiles = (
      "00000022220000000000002222000000"+
      "00000211112000000000021111200000"+
      "00002111111200000000211111120000"+
      "00021112211120000002111221112000"+
      "00021120021112222221112002112000"+
      "00021120002111111111120002112000"+
      "00021120000211111111200002112000"+
      "00021120000022222222000002112000"+
      "00021120000000000000000002112000"+
      "00021120000000000000000002112000"+
      "00021112000000000000000021112000"+
      "00002111200000000000000211120000"+
      "00000211122222222222222111200000"+
      "00000021111111111111111112000000"+
      "00000002111111111111111120000000"+
      "00000000222222222222222200000000"
    );
    this.xLen = 32;
    this.yLen = 16;
    this.tileSize = 20;
  }
  /**
   * @returns 左上を(0,0)として、(x,y)個目のタイルの数字を返す
   * @param {number} x
   * @param {number} y
   */
  tileAt(x,y) {
    if (x<0 || x>=this.xLen || y<0 || y>=this.yLen) return 0;
    return parseInt(this.tiles[this.xLen*y + x]);
  }
  /**
   * @returns 左上を(0,0)として、座標(x,y)にあるタイルの数字を返す
   * タイル一つの大きさ（辺の長さ）は、this.tileSizeとなる
   * @param {number} x 
   * @param {number} y 
   */
  tileAtCoord(x,y) {
    return this.tileAt(floor(x/this.tileSize), floor(y/this.tileSize));
  }
}

class Game {
  constructor() {
    this.player = new Player();
    this.level = new Level();

    this.nearPlane = 0.25;
    this.fovDeg = 75;
    this.isPerspective = true;
  }

  proc() {
    // 視点を移動
    if (mouseIsPressed && mouseY < height) {
      this.player.pos.x = mouseX;
      this.player.pos.y = mouseY;
    }

    // 視点を回転
    if (keyIsDown(68)) this.player.angle += PI/180; // Dキー
    if (keyIsDown(65)) this.player.angle -= PI/180; // Aキー
    
    // 上昇と下降
    if (keyIsDown(83)) this.nearPlane -= 0.005; // Sキー
    if (keyIsDown(87)) this.nearPlane += 0.005; // Wキー
  }

  fv(v) {
    let n = this.nearPlane;
    return this.isPerspective ? n/(1-v) : v+n;
  }

  draw() {

    background(192);

    //----- 上画面を描画
    {
      push();
      noStroke();
      fill(248);
      let L = this.level;
      let w = this.level.tileSize;
      for(let y=0; y<L.yLen; y++) {
        for(let x=0; x<L.xLen; x++) {
          let t = L.tileAt(x,y);
          if (t === 1) rect(w*x, w*y, w, w);
          if (t === 2) circle(w*x+w/2, w*y+w/2, w/1.5);
        }
      }
      pop();
    }

    //----- 中央の仕切りを描画
    {
      push();
      stroke(128);
      strokeWeight(2);
      line(0, 320, 640, 320);
      pop();
    }

    let textH = 0;
    let textV = 0;
    let textFv = 0;
    //-----
    {
      push();

      let p = this.player.pos; //プレイヤーの位置ベクトル
      let a = this.player.angle; //プレイヤーの向き（ラジアン）。右向きが0で時計回りに増える。
      let L = new Vec2(100, 0).rotate(a); //視界の左端のベクトル
      let R = L.rotate((this.fovDeg*PI)/180); //視界の右端のベクトル

      // 上画面のグリッドの端を描画
      Util.drawLine(p, L);
      Util.drawLine(p, R);
      Util.drawLine(p.add(L), R.sub(L));

      // 上画面のグリッドを描画
      stroke(0);
      strokeWeight(1);
      // 水平
      for(let p2=320; p2<640; p2+=24) {
        let v = this.fv((640-p2)/320);
        if (abs(v) > 1) continue;
        let L2 = L.mul(v);
        let R2 = R.mul(v);
        Util.drawLine(p.add(L2), R2.sub(L2));
      }
      // 垂直 
      for(let p1=0; p1<640; p1+=24){
        let h = p1/640;
        let t = L.mul(1-h).add(R.mul(h));
        Util.drawLine(p, t);
      }

      // 下画面を描画
      noStroke();
      fill(255);
      // すべてのピクセルに対し……
      for(let p2=320; p2<640; p2+=12) {
        for(let p1=0; p1<640; p1+=12) {
          // グリッドのうちどこをサンプルするかを、h,vより決定し、ベクトルsとする
          // h,vはそれぞれ0～1の実数
          let h = p1/640;
          let v = this.fv((640-p2)/320);//fvとはプレイヤーの高さのこと
          let s = L.mul(v*(1-h)).add(R.mul(v*h));

          // (t1,t2)はタイルマップ上での座標。
          // (t1,t2)にタイルがあれば、(p1,p2)にドットを描画する
          let t1 = s.add(p).x;
          let t2 = s.add(p).y;
          let t = this.level.tileAtCoord(t1, t2);
          if (t === 0) continue;
          if (t === 2) {
            // 道路脇のバンパーを円形にする
            let w = this.level.tileSize;
            if (new Vec2(t1%w,t2%w).sub(new Vec2(w/2,w/2)).mag() > w/3) continue;
          }
          rect(p1, p2, 5, 5);
        }
      }

      //----- 矢印を描画
      if (mouseY > 320) {
        //下画面の矢印を計算
        let r = new Vec2(0, 640); //画面の左下の座標 (root)
        let w = new Vec2(mouseX,mouseY).sub(r); //rootからマウスへ向かうベクトル
        //上画面の矢印を計算
        let h = w.x/640;
        let v = this.fv(-w.y/320);
        let s = L.mul(v*(1-h)).add(R.mul(v*h));
        push();
        strokeWeight(3);
        stroke('black');
        Util.drawArrow(r, w);
        Util.drawArrow(p, s);
        strokeWeight(2);
        stroke('yellow');
        Util.drawArrow(r, w);
        Util.drawArrow(p, s);
        pop();
        textH = h;
        textV = -w.y/320;
        textFv = this.fv(-w.y/320);
      }
      
      pop();
    }

    // ----- テキストを描画
    // ※
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals
    // temprate literalsを使うと、変数混じりの文字列をより見やすくあらわせます。
    // ↓の2例は同じ結果となります。
    // text('x='+x+' y='+y+' z='+z);
    // text(`x=${x} y=${y} z=${z}`);
    {
      push();
      textStyle(BOLD);
      textAlign(LEFT, TOP);
      textSize(20);
      text('マウスドラッグで移動、A,Dキーで回転、W,Sキーで上昇下降', 5, 5);
      textSize(28);
      text(`h=${nf(textH,1,2)}  v=${nf(textV,1,2)}  f(v)=${nf(textFv,1,2)}  n=${nf(game.nearPlane,1,2)}`, 5, 30);
      pop();
    }
  }
}
let game;

function setup() {
  createCanvas(640, 640);
  game = new Game();

  // createButton関数で作ったボタンに、CSSで大きさやレイアウトを設定する
  // ……という関数
  let beautify = button => {
    button.style('font-size', '2em');
    button.style('width', width + 'px');
    button.style('margin-top', '0.15em');
  }

  let switcher = createButton('遠近感 on/off');
  switcher.mousePressed(_=>{
    // ※
    // 「!」は、論理NOT演算子です。
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_Operators
    game.isPerspective = !game.isPerspective;
    game.nearPlane = game.isPerspective ? 0.25 : 0;
  });
  beautify(switcher);
}

function draw() {
  game.proc();
  game.draw();
}
