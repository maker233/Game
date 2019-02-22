function Background(game) {
    this.game = game;

    this.img1 = new Image();
    this.img2 = new Image();
    this.img3 = new Image();
    this.img4 = new Image();
    this.img5 = new Image();
    this.img6 = new Image();
    this.img7 = new Image();
    this.img8 = new Image();

    // primer background
    // this.img1.src = 'images/parallax/layer_01.png';
    // this.img2.src = 'images/parallax/layer_02.png';
    // this.img3.src = 'images/parallax/layer_03.png';
    // this.img4.src = 'images/parallax/layer_04.png';
    // this.img5.src = 'images/parallax/layer_05.png';
    // this.img6.src = 'images/parallax/layer_06.png';
    // this.img7.src = 'images/parallax/layer_07.png';
    // this.img8.src = 'images/parallax/layer_08.png';

    this.img1.src = 'images/flatbg/game_background_3/layers/ground_3.png';
    this.img2.src = 'images/flatbg/game_background_3/layers/clouds_2.png';
    this.img3.src = 'images/flatbg/game_background_3/layers/clouds_1.png';
    this.img4.src = 'images/flatbg/game_background_3/layers/ground_2.png';
    this.img5.src = 'images/flatbg/game_background_3/layers/ground_1.png';
    this.img6.src = 'images/flatbg/game_background_3/layers/plant.png';
    this.img7.src = 'images/flatbg/game_background_3/layers/rocks.png';
    this.img8.src = 'images/flatbg/game_background_3/layers/sky.png';

    this.y = 0;

    this.x1 = 0;
    this.x2 = 0;
    this.x3 = 0;
    this.x4 = 0;
    this.x5 = 0;
    this.x6 = 0;
    this.x7 = 0;
    this.x8 = 0;
}

Background.prototype.draw = function() {
    this._layer08()
    this._layer07()
    this._layer06()
    this._layer05()
    this._layer04()
    this._layer03()
    this._layer02()
    this._layer01()
}

Background.prototype.move = function() {
    this._move01()
    this._move02()
    this._move03()
    this._move04()
    this._move05()
    this._move06()
    this._move07()
    this._move08()
}

Background.prototype._layer01 = function() {

    this.game.ctx.drawImage(this.img1, this.x1, this.y - 20, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img1, this.x1 + this.game.canvas.width, this.y - 22, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer02 = function() {

    this.game.ctx.drawImage(this.img2, this.x2, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img2, this.x2 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer03 = function() {

    this.game.ctx.drawImage(this.img3, this.x3, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img3, this.x3 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer04 = function() {

    this.game.ctx.drawImage(this.img4, this.x4, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img4, this.x4 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer05 = function() {

    this.game.ctx.drawImage(this.img5, this.x5, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img5, this.x5 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer06 = function() {

    this.game.ctx.drawImage(this.img6, this.x6, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img6, this.x6 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer07 = function() {

    this.game.ctx.drawImage(this.img7, this.x7, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img7, this.x7 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
Background.prototype._layer08 = function() {

    this.game.ctx.drawImage(this.img8, this.x8, this.y, this.game.canvas.width, this.game.canvas.height);

    //Segundo bg
    this.game.ctx.drawImage(this.img8, this.x8 + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);

};
//  MOVE ---------------------------------
//  MOVE ---------------------------------

Background.prototype._move01 = function() {
    this.x1 -= 2.3;

    if (this.x1 < -this.game.canvas.width) this.x1 = 0;
};
Background.prototype._move02 = function() {
    this.x2 -= 2;

    if (this.x2 < -this.game.canvas.width) this.x2 = 0;
};
Background.prototype._move03 = function() {
    this.x3 -= 1.5;

    if (this.x3 < -this.game.canvas.width) this.x3 = 0;
};
Background.prototype._move04 = function() {
    this.x4 -= 1.2;

    if (this.x4 < -this.game.canvas.width) this.x4 = 0;
};
Background.prototype._move05 = function() {
    this.x5 -= 0.9;

    if (this.x5 < -this.game.canvas.width) this.x5 = 0;
};
Background.prototype._move06 = function() {
    this.x6 -= 0.6;

    if (this.x6 < -this.game.canvas.width) this.x6 = 0;
};
Background.prototype._move07 = function() {
    this.x7 -= 0.3;

    if (this.x7 < -this.game.canvas.width) this.x7 = 0;
};
Background.prototype._move08 = function() {
    this.x8 -= 0.1;

    if (this.x8 < -this.game.canvas.width) this.x8 = 0;
};