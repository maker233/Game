function Bullet(game) {
    this.game = game;

    this.x = this.game.player.x - 5;
    this.y = this.game.player.y + this.game.player.h / 2;

    this.w = 25
    this.h = 20

    //this.r = 5;

    this.img = new Image();
    this.img.src = 'images/player/fireball.png';

}

Bullet.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

    // this.game.ctx.beginPath();
    // this.game.ctx.fillStyle = "red";
    // this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
    // this.game.ctx.fill();
    // this.game.ctx.closePath();
}

Bullet.prototype.move = function() {
    this.x -= 10;

};