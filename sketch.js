const __PlayerSize = 8;
const __InitPlayerPosX = 320;
const __InitPlayerPosY = 360;
const __InitPlayerVelX = 0;
const __InitPlayerVelY = 0;
let __RGBA_BackGround;
let __RGBA_BackGround2;
let __RGBA_PLAYER;
let __RGBA_EYE;
let __RGBA_WALL;
let __RGBA_WALL_EDGE;
let __RGBA_SKY;
let __RGBA_LAND;

let __Game;
function setup() {
    frameRate(30);

    __Game = new myGame();
    __Game.reset();

    //マップ作成
    //640*480
    //X:32*20, Y:32*15
    //X:40*16, Y:40*12
    //X:80* 8, Y:80* 6

    //640*224
    //X:32*20, Y:32*7
    //X:16*40, Y:16*14
    //X:8*80, Y:8*28
    __Game.map.create(
        (
            '.*************.......................1..' +
            '**+..._._._._********...............121.' +
            '*+...._._._._._._._.********.........1..' +
            '*+..+*****+._._._._._._._._*********....' +
            '*___**1*********++_._._._._._._._..**...' +
            '*...*1**+.....+**+++_._._._._._._...***.' +
            '*___*1*+.......+********+++*****+.....**' +
            '*...***....++..._._...+*****111*++++...*' +
            '*___**....+**+.._._....+**11111*****+..*' +
            '*...+....**********+....+***11111**++..*' +
            '*......***........**+....++*******++...*' +
            '*.....+*...2...2...***...._._._._......*' +
            '**...+**.............**..._._._._.....**' +
            '.******.....222.......*****************.'

            // '........................................' +
            // '........................................' +
            // '........................................' +
            // '.......***************************......' +
            // '........................................' +
            // '...................+++..................' +
            // '........................................' +
            // '...................+++..................' +
            // '........................................' +
            // '...................+++..................' +
            // '........................................' +
            // '........................................' +
            // '........................................' +
            // '........................................'
        ),
        16,
        40,
        14
    );
    // __Game.map.create(
    //     (
    //         '********************************************************************************' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*......******************************************************************......*' +
    //         '*.....**................................................................**.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....*..................................................................*.....*' +
    //         '*.....**................................................................**.....*' +
    //         '*......******************************************************************......*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '*..............................................................................*' +
    //         '********************************************************************************'
    //     ),
    //     8,
    //     80,
    //     28
    // );
      
    __RGBA_BackGround = color(223, 223, 223, 255);
    __RGBA_PLAYER = color(255, 0, 0, 255);
    __RGBA_EYE = color(255, 255, 0, 255);

    let cr = 3;
    
    if(cr===1){
        //スタイリッシュ＆レトロ
        //color('#75B1A9');//Sky//青
        //color('#D9B44A');//Sunglow//オレンジ
        //color('#4F6457');//Mountains//濃い緑
        //color('#ACD0C0');//Mist//薄い緑
        __RGBA_WALL = color('#ACD0C0');//Mist//薄い緑
        __RGBA_WALL_EDGE = color('#D9B44A');//Sunglow//オレンジ
        __RGBA_SKY = color('#75B1A9');//Sky//青
        __RGBA_LAND = color('#4F6457');//Mountains//濃い緑
    }
    else if(cr===2){
        //中間＆多目的
        //color('#626D71');//Slate//黒
        //color('#CDCDC0');//Ceramic//白
        //color('#DDBC95');//Latte//薄い茶
        //color('#B38867');//Coffee//濃い茶
        __RGBA_WALL = color('#B38867');//Coffee//濃い茶
        __RGBA_WALL_EDGE = color('#DDBC95');//Latte//薄い茶
        __RGBA_SKY = color('#CDCDC0');//Ceramic//白
        __RGBA_LAND = color('#626D71');//Slate//黒
    }
    else if(cr===3){
        //北極の夜明け
        //color('#FFCCBB');//Sunrise//ピンク
        //color('#6EB5C0');//BlueTopaz//薄い青
        //color('#006C84');//Cerulean//濃い青
        //color('#E2E8E4');//Icicle//白
        __RGBA_BackGround = color(255, 255, 255, 255);
        __RGBA_BackGround2 = color(226, 232, 228, 255);//Icicle//薄い白
        __RGBA_WALL = color(128, 128, 128, 255);
        __RGBA_WALL_EDGE = color(255, 204, 187, 255);//Sunrise//ピンク
        __RGBA_SKY = color(110, 181, 192, 255);//BlueTopaz//薄い青
        __RGBA_LAND = color(0, 108, 132, 255);//Cerulean//濃い青
    }
    else{
        __RGBA_WALL = color(255, 255, 255, 255);
        __RGBA_WALL_EDGE = color(0, 255, 255, 255);
        __RGBA_SKY = color(0, 128, 128, 255);
        __RGBA_LAND = color(64, 32, 32, 255);
    }

    createCanvas(640, 480);
    strokeWeight(0);
}

//#region myVec
class myVec {
    /**
     * ベクトル
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * コピー
     */
    copy() {
        return new myVec(this.x, this.y);
    }

    /**
     * 大きさ取得
     */
    mag() {
        return sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
    * 加算する
    * @param {myVec} vec 
    */
    add(vec) {
        return new myVec(this.x + vec.x, this.y + vec.y);
    }

    /**
    * 減算する
    * @param {myVec} vec 
    */
    sub(vec) {
        return new myVec(this.x - vec.x, this.y - vec.y);
    }

    /**
     * 乗算する
     * @param {number} n
     */
    mul(n) {
        return new myVec(this.x * n, this.y * n);
    }

    /**
     * 回転する
     * @param {number} rad
     */
    rotate(rad) {
        return new myVec(this.x * cos(rad) - this.y * sin(rad), this.x * sin(rad) + this.y * cos(rad));
    }
}
//#endregion

//#region myLine
class myLine {
    /**
     * 直線
     * @param {myVec} pos 
     * @param {myVec} len 
     */
    constructor(pos, len) {
        this.pos = pos;
        this.len = len;
    }

    /**
     * 描画する
     */
    draw(){
        line(this.pos.x, this.pos.y, this.end.x, this.end.y);
    }

    /**
     * 2点から直線を引く
     * @param {myVec} begin 
     * @param {myVec} end 
     */
    static myLine2Vec(begin, end){
        return new myLine(begin, end.sub(begin));
    }

    /**
     * 開始点を取得
     */
    get begin() {
        return this.pos;
    }

    /**
     * 終点を取得
     */
    get end() {
      return this.pos.add(this.len);
    }

    /**
     * 線分との交点を取得
     * @param {myLine} line
     */
    intersectionLine(line) {
        let ThisLine = this;
        // Y軸並行の線分はこのコードでは扱えないので、並行の場合は微妙にずらす
        if (abs(ThisLine.len.x) < 0.001) ThisLine.len.x = 0.001;
        if (abs(line.len.x) < 0.001) line.len.x = 0.001;
    
        // 交点を求める
        let sx = (ThisLine.len.y / ThisLine.len.x * ThisLine.pos.x - line.len.y / line.len.x * line.pos.x - ThisLine.pos.y + line.pos.y) / (ThisLine.len.y / ThisLine.len.x - line.len.y / line.len.x);
        let sy = ThisLine.len.y / ThisLine.len.x * (sx - ThisLine.pos.x) + ThisLine.pos.y;
    
        // 交点が線分上にないときはnullを返す
        if (sx >= min(ThisLine.begin.x, ThisLine.end.x) &&
            sx <= max(ThisLine.begin.x, ThisLine.end.x) &&
            sx >= min(line.begin.x, line.end.x) &&
            sx <= max(line.begin.x, line.end.x)){
              return new myVec(sx, sy);
        }
        else{
            return null;
        }
    }
}
//#endregion

//#region myPlayer
class myPlayer {
    /**
     * 自機
     */
    constructor() {
        this.pos = new myVec(0, 0);
        this.angle = 0;
        this.size = 0;
        this.myLines = [];      //myLinesを格納//当たり判定用
    }

    move(){
        let spd = 2;
        //移動前
        let x = this.pos.x;
        let y = this.pos.y;
        if (keyIsDown(90)) this.angle -= PI / 90;//zキー入力
        if (keyIsDown(88)) this.angle += PI / 90;//xキー入力

        for(let t = 1; t <= 4; t++){
            let tx = 0;
            let ty = 0;
            if(t === 1){
                if (keyIsDown(LEFT_ARROW)){
                    tx -= cos(this.angle+HALF_PI) * spd;
                    ty -= sin(this.angle+HALF_PI) * spd;
                }
                else {
                    continue;
                }
            }
            else if(t === 2){
                if (keyIsDown(RIGHT_ARROW)){
                    tx += cos(this.angle+HALF_PI) * spd;
                    ty += sin(this.angle+HALF_PI) * spd;
                }
                else {
                    continue;
                }
            }
            else if(t === 3){
                if (keyIsDown(UP_ARROW)){
                    tx += cos(this.angle) * spd;
                    ty += sin(this.angle) * spd;
                }
                else{
                    continue;
                }
            }
            else{
                if (keyIsDown(DOWN_ARROW)){
                    tx -= cos(this.angle) * spd;
                    ty -= sin(this.angle) * spd;
                }
                else{
                    continue;
                }
            }

            for(let z = 0; z <= 1; z++) {
                for(let line of this.myLines) {
                    if(z === 0) line.pos.x += tx;
                    else line.pos.y += ty;
                }
                //当たり判定
                let flg = false;
                for(let line of this.myLines) {
                    let allHitBeamWays = __Game.map.myLines.map(wall => line.intersectionLine(wall)).filter(pos => pos !== null).map(pos => pos.sub(line.begin));
                    if (allHitBeamWays.length === 0) {
                        continue;
                    }
                    else{
                        //当たった
                        flg = true;
                    }
                }

                if(flg === true) {
                    for(let line of this.myLines) {
                        if(z === 0) line.pos.x -= tx;
                        else line.pos.y -= ty;
                    }
                }
                else{
                    if(z === 0) this.pos.x += tx;
                    else this.pos.y += ty;
                }
            }
        }
    }

    /**
     * 描画する
     */
    draw(){
        fill(__RGBA_PLAYER);
        rect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);



        //真ん中の線
        stroke(0);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, cos(this.angle) * this.size/2 + this.pos.x, sin(this.angle) * this.size/2 +this.pos.y);
        strokeWeight(0);
    }
}
//#endregion

//#region myMap
class myMap {
    constructor() {
        /**
         * マップ
         */
        this.myLines = [];      //myLinesを格納
        this.mapString = '';    //[.]がなし、[*]が壁
        this.tileSize = 0;      //1つ当たりのタイルの大きさ
        this.mapWidth = 0;      //横のタイル数
        this.mapHeight = 0;     //縦のタイル数
    }

    /**
     * xとyからマップ文字列を取得
     * @param {number} x 
     * @param {number} y
     */
    mapStringAt(x, y) {
        return this.mapString[this.mapWidth*y + x];
    }

    /**
     * 左上を(0,0)として、座標(x,y)にあるタイルの数字を返す
     * @param {number} x 
     * @param {number} y 
     */
    mapStringAtCoord(x, y) {
        return this.mapStringAt(floor(x / this.tileSize), floor((y - 248) / this.tileSize));
    }

    /**
     * 描画する
     */
    draw(){
        stroke(__RGBA_WALL);
        let YohakuY = 248;//上部の余白
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = this.mapStringAt(x, y);
                if (tile === '.') {
                    fill(__RGBA_BackGround); 
                }
                else if (tile === '_') {
                    fill(__RGBA_BackGround2); 
                }
                else if (tile === '*') {
                    fill(__RGBA_WALL); 
                }
                else if (tile === '+') {
                    fill(__RGBA_WALL_EDGE); 
                }
                else if (tile === '1') {
                    fill(__RGBA_SKY); 
                }
                else if (tile === '2') {
                    fill(__RGBA_LAND); 
                }
                rect(this.tileSize * x, this.tileSize * y + YohakuY, this.tileSize, this.tileSize);
            }
        }
    }

    /**
     * マップ作成
     * @param {string} mapstring
     * @param {number} tilesize
     * @param {number} mapwidth
     * @param {number} mapheight
     */
    create(mapstring, tilesize, mapwidth, mapheight) {
        this.myLines.splice(0);//配列をすべて削除

        let YohakuY = 248;//上部の余白
        //マップ作成
        this.mapString = mapstring;
        this.tileSize = tilesize;
        this.mapWidth = mapwidth;
        this.mapHeight = mapheight;
        let s = tilesize;
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let tile = this.mapStringAt(x, y);
                if (tile === '*') {
                    this.myLines.push(new myLine(new myVec(this.tileSize * x, this.tileSize * y + YohakuY), new myVec(this.tileSize, 0)));
                    this.myLines.push(new myLine(new myVec(this.tileSize * x, this.tileSize * y + YohakuY), new myVec(0, this.tileSize)));
                    if (this.mapStringAt(x, y + 1) != '*') {
                        this.myLines.push(new myLine(new myVec(this.tileSize * x, this.tileSize * y + this.tileSize + YohakuY), new myVec(this.tileSize, 0)));
                    }
                    if (this.mapStringAt(x + 1, y) != '*') {
                        this.myLines.push(new myLine(new myVec(this.tileSize * x + this.tileSize, this.tileSize * y + YohakuY), new myVec(0, this.tileSize)));
                    }
                }
            }
        }
    }
}
//#endregion

//#region myGame
class myGame {
    /**
     * グローバル変数
     */
    constructor() {
        this.player = new myPlayer();
        this.map = new myMap();
    }

    /**
     * 初期化
     */
    reset() {
        this.player.pos = new myVec(__InitPlayerPosX, __InitPlayerPosY);
        this.player.angle = -PI / 2;
        this.player.size = __PlayerSize;
        this.player.myLines.splice(0);//配列をすべて削除

        this.player.myLines.push(new myLine(new myVec(this.player.pos.x - this.player.size/2, this.player.pos.y - this.player.size/2), new myVec(this.player.size, 0)));//上
        this.player.myLines.push(new myLine(new myVec(this.player.pos.x - this.player.size/2, this.player.pos.y + this.player.size/2), new myVec(this.player.size, 0)));//下
        this.player.myLines.push(new myLine(new myVec(this.player.pos.x - this.player.size/2, this.player.pos.y - this.player.size/2), new myVec(0, this.player.size)));//左
        this.player.myLines.push(new myLine(new myVec(this.player.pos.x + this.player.size/2, this.player.pos.y + this.player.size/2), new myVec(0, -this.player.size)));//右
    }
}
//#endregion

//デバッグ
function touchMoved(event) {
    __Game.player.pos.x = event.clientX;
    __Game.player.pos.y = event.clientY;

    __Game.player.myLines.splice(0);//配列をすべて削除
    __Game.player.myLines.push(new myLine(new myVec(__Game.player.pos.x - __Game.player.size/2, __Game.player.pos.y - __Game.player.size/2), new myVec(__Game.player.size, 0)));//上
    __Game.player.myLines.push(new myLine(new myVec(__Game.player.pos.x - __Game.player.size/2, __Game.player.pos.y + __Game.player.size/2), new myVec(__Game.player.size, 0)));//下
    __Game.player.myLines.push(new myLine(new myVec(__Game.player.pos.x - __Game.player.size/2, __Game.player.pos.y - __Game.player.size/2), new myVec(0, __Game.player.size)));//左
    __Game.player.myLines.push(new myLine(new myVec(__Game.player.pos.x + __Game.player.size/2, __Game.player.pos.y + __Game.player.size/2), new myVec(0, -__Game.player.size)));//右
}

function draw() {
    var time = new Date().getTime();
    __Game.player.move();

    //背景
    background(__RGBA_BackGround);

    //壁を描画
    __Game.map.draw();



    //3D
    {
        //空の色
        stroke(__RGBA_SKY);
        fill(__RGBA_SKY);
        rect(0, 8, width, 112);

        //地面の色
        stroke(__RGBA_LAND);
        fill(__RGBA_LAND);
        rect(0, 120, width, 112);


        //余白（0-8）:8px
        //3D（8-232）:224px
        //余白（232-248）:16px
        //2D（248-472）:224px
        //余白（472-480）:8px

        // //地面の描画
        // let L = new myVec(100, 0).rotate(__Game.player.angle - PI * 0.4); //視界の左端のベクトル
        // let R = L.rotate(PI*0.8); //視界の右端のベクトル

        // fill(color(255,255,0));

        // let takasa = 0.1;

        // for(let y = 8; y <= 232; y += 8) {
        //     for(let x = 0; x <= 640; x += 8) {
        //         let h = x / 640;
        //         //let v = this.fv((640-y)/320);//fvとはプレイヤーの高さのこと
        //         let v = takasa / (1 - ((232 - y) / 320));
        //         //let s = L.mul(v*(1-h)).add(R.mul(v*h));
        //         let s = L.mul(v * (1 - h)).add(R.mul(v * h));
                
        //         // (t1,t2)はタイルマップ上での座標。
        //         // (t1,t2)にタイルがあれば、(p1,p2)にドットを描画する
        //         let t1 = s.add(__Game.player.pos).x;
        //         let t2 = s.add(__Game.player.pos).y;
        //         let t = __Game.map.mapStringAtCoord(t1, t2);
        //         if (t != '*') {
        //             rect(x, y, 5, 5);
        //         }
        //     }
        // }


        //壁の描画
        let viewRect = new myLine(new myVec(0, 8), new myVec(width, 224));

        let centerAngle = __Game.player.angle;
        let leftAngle = centerAngle - PI * 0.2;
        let rightAngle = centerAngle + PI* 0.2;
        let beamTotal = 64;//視線数
        let beamLen = 150;//視線の長さ
        let beamIndex = -1;
        for(let angle = leftAngle; angle < rightAngle + 0.01; angle += PI * 0.4 / beamTotal) {
            beamIndex++;
            let beam = new myLine(__Game.player.pos.copy(), new myVec(cos(angle), sin(angle)).mul(beamLen));
            let allHitBeamWays = __Game.map.myLines.map(wall => beam.intersectionLine(wall)).filter(pos => pos !== null).map(pos => pos.sub(beam.begin));

            let hitBeam;

            //背景描画
            let bgSX;
            let bgGX;
            let bgSY;
            let bgGY;

            if (allHitBeamWays.length === 0) {
                bgSX = __Game.player.pos.x;
                bgSY = __Game.player.pos.y;
                bgGX = beam.end.x;
                bgGY = beam.end.y;
            }
            else{
                hitBeam = allHitBeamWays.reduce((a, b) => a.mag() < b.mag() ? a : b);//壁に当たる視線

                bgSX = __Game.player.pos.x;
                bgSY = __Game.player.pos.y;
                bgGX = __Game.player.pos.add(hitBeam).x;
                bgGY = __Game.player.pos.add(hitBeam).y;
            }

            let bgSPX;
            let bgSPY;
            if(abs(bgGX - bgSX) < abs(bgGY - bgSY)){
                bgSPX = (bgGX - bgSX) / abs(bgGY - bgSY);
                if(abs(bgSPX) < 0.001 && bgSPX < 0) {
                    bgSPX = -0.01;
                }
                else if(abs(bgSPX) < 0.001 && bgSPX > 0) {
                    bgSPX = 0.01;
                }

                if(bgGY - bgSY < 0) {
                    bgSPY = -1;
                }
                else if(bgGY - bgSY > 0){
                    bgSPY = 1;
                }
                else {
                    bgSPY = 0;
                }
            }
            else{
                if(bgGX - bgSX < 0) {
                    bgSPX = -1;
                }
                else if(bgGX - bgSX > 0){
                    bgSPX = 1;
                }
                else {
                    bgSPX = 0;
                }

                bgSPY = (bgGY - bgSY) / abs(bgGX - bgSX);
                if (abs(bgSPY) < 0.001 && bgSPY < 0) {
                    bgSPY = -0.01;
                }
                else if(abs(bgSPY) < 0.001 && bgSPY > 0) {
                    bgSPY = 0.01;
                }

            }

            if(bgSPX != Infinity && bgSPY != Infinity && (bgSX != bgGX && bgSY != bgGY)) {
                while(true) {
                    if(__Game.map.mapStringAtCoord(bgSX, bgSY) === "." || __Game.map.mapStringAtCoord(bgSX, bgSY) === "_" || __Game.map.mapStringAtCoord(bgSX, bgSY) === "+") {
                        if(__Game.map.mapStringAtCoord(bgSX, bgSY) === ".") {
                            fill(0);
                        }
                        else{
                            fill(200);
                        }
                        //rect(bgSX, bgSY, 1, 1);

                        //距離を取得
                        let p1 = new myVec(bgSX, bgSY).sub(__Game.player.pos);
                        let wallDist1 = p1.mag();
                        let wallPerpDist1 = wallDist1 * cos(angle - centerAngle);
                        let lineHeight1 = constrain(240 * ((abs(beamLen - wallPerpDist1) ** 8) / (beamLen ** 8)), 0, 112);
                        let lineBegin1 = viewRect.begin.add(new myVec(viewRect.len.x/beamTotal*beamIndex,112));
                        rect(lineBegin1.x, lineBegin1.y, ceil(width/beamTotal), lineHeight1);//背景の描画
                    }
                    bgSY += bgSPY;
                    bgSX += bgSPX;
                    if((bgSPX > 0 && bgSPY > 0 && bgSX >= bgGX && bgSY >= bgGY) ||
                        (bgSPX > 0 && bgSPY < 0 && bgSX >= bgGX && bgSY <= bgGY) ||
                        (bgSPX < 0 && bgSPY < 0 && bgSX <= bgGX && bgSY <= bgGY) ||
                        (bgSPX < 0 && bgSPY > 0 && bgSX <= bgGX && bgSY >= bgGY) ||
                        (bgSPX === 0 && bgSPY > 0 && bgSY >= bgGY) ||
                        (bgSPX === 0 && bgSPY < 0 && bgSY <= bgGY) ||
                        (bgSPY === 0 && bgSPX > 0 && bgSX >= bgGX) ||
                        (bgSPY === 0 && bgSPX < 0 && bgSX <= bgGX) ||
                        (bgSPX === 0 && bgSPY === 0)) {
                        break;
                    }
                }
            }
            //

            //壁の描画
            if (allHitBeamWays.length === 0) {
                stroke(__RGBA_EYE);
                strokeWeight(1);
                beam.draw();
                strokeWeight(0);
            }
            else{
                let wallPerpDist = hitBeam.mag() * cos(angle - centerAngle);
                let lineHeight = constrain(240 * ((abs(beamLen - wallPerpDist) ** 8) / (beamLen ** 8)), 0, 224);
                let lineBegin = viewRect.begin.add(new myVec(viewRect.len.x/beamTotal*beamIndex, viewRect.len.y/2-lineHeight/2));
                
                fill(__RGBA_WALL);
                rect(lineBegin.x, lineBegin.y, ceil(width/beamTotal), lineHeight);
    
                //長さによって暗くする
                let cr = (255 - 255 * (abs(beamLen - wallPerpDist) / beamLen));
                fill(color(0, 0, 0, cr));
                rect(lineBegin.x, lineBegin.y, ceil(width/beamTotal), lineHeight);
    
                //壁に当たっている視線を描画
                stroke(255);
                strokeWeight(1);
                line(__Game.player.pos.x, __Game.player.pos.y, __Game.player.pos.add(hitBeam).x, __Game.player.pos.add(hitBeam).y);
                strokeWeight(0);
            }

            //
        }
    }  


    // プレイヤーを描画
    fill(__RGBA_PLAYER);
    __Game.player.draw();

    //3Dビューとの境界線表示
    fill(0);
    rect(0, 0, width, 8);//上部余白8
    rect(0, 232, width, 16);//真ん中余白16
    rect(0, 472, width, 8);//下部余白8
    //rect(0, 0, 1, height);//左
    //rect(width - 1, 0, 1, height);//右
    
    //テスト
    // for(let x = 0; x<= 100000; x++) {

    // }

    //処理速度
    text(new Date().getTime() - time, 625, 470);
}