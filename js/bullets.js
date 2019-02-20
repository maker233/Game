function Bullet(game) {
    this.game = game;

    this.x = this.game.player.x - 5;
    this.y = this.game.player.y + this.game.player.h / 2;

    this.w = 15
    this.h = 5

    //this.r = 5;

}

Bullet.prototype.draw = function() {
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
    //this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.game.ctx.fill();
    this.game.ctx.closePath();
}

Bullet.prototype.move = function() {
    this.x -= 15;

};