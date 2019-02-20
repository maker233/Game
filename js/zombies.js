function Zombie(game) {
    this.game = game;

    this.x = 10
    this.y = 400 + Math.random() * 200;
    //this.w = Math.random() * 100 + 50
    this.w = 60;
    this.h = 60;

    this.img = new Image();
    this.img.src = 'images/zombirun.png';

    // número de imágenes diferentes
    this.img.frames = 6;
    this.img.frameIndex = 0;

}
Zombie.prototype.draw = function() {

    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    //this.game.ctx.fillStyle = "green";
    //this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

    this.game.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        Math.floor(this.img.width / this.img.frames),
        this.img.height / 3,
        this.x,
        this.y,
        this.w,
        this.h
    );

};
Zombie.prototype.move = function() {

    if (this.y < this.game.player.y) {
        this.y += 0.5
    } else {
        this.y -= 0.5
    }
    this.x += 1;
}