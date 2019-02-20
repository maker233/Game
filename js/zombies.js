function Zombie(game) {
    this.game = game;

    this.x = 10
    this.y = 400 + Math.random() * 200;
    //this.w = Math.random() * 100 + 50
    this.w = 70;
    this.h = 70;

    this.img = new Image();
    this.img2 = new Image();
    this.img.src = 'images/sprites/zombieboy.png';
    this.img2.src = 'images/sprites/zombieboy.png';
    // img2 sprite muerte zombie

    // número de imágenes diferentes
    this.img.frames = 10;
    this.img.frameIndex = 0;

}
Zombie.prototype.draw = function() {

    // this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    //this.game.ctx.fillStyle = "green";
    //this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

    this.game.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        Math.floor(this.img.width / this.img.frames),
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
    );

    this.animateImg();

};
Zombie.prototype.move = function() {

    if (this.y < this.game.player.y) {
        this.y += 0.5
    } else {
        this.y -= 0.5
    }
    this.x += 1;
}

Zombie.prototype.animateImg = function() {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (this.game.framesCounter % 6 === 0) {
        this.img.frameIndex += 1;

        // Si el frame es el último, se vuelve al primero
        if (this.img.frameIndex > 9) this.img.frameIndex = 0;
    }
};

Zombie.prototype.killAnimation = function() {
    this.game.ctx.drawImage(
        this.img2,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        Math.floor(this.img.width / this.img.frames),
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
    );

}