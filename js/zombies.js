function Zombie(game) {
    this.game = game;

    this.x = 10
    this.y = 400 + Math.random() * 200;
    //this.w = Math.random() * 100 + 50
    this.w = 60;
    this.h = 60;

    this.img = new Image();
    this.img.src = 'images/Run4.png';

}
Zombie.prototype.draw = function() {

    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    //this.game.ctx.fillStyle = "green";
    //this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

};
Zombie.prototype.move = function() {

    if (this.y < this.game.player.y) {
        this.y += 1
    } else {
        this.y -= 1
    }
    this.x += 1;
}