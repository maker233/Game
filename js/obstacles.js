function Obstacle(game) {
    this.game = game;

    this.x = 1000
    this.y = 400 + Math.random() * 200;
    //this.w = Math.random() * 100 + 50
    this.w = 80;
    this.h = 90;

    this.img = new Image();
    // this.img.src = 'images/rock01.png';
    // this.img.src = 'images/rock02.png';

    this.images = ['images/rock01.png', 'images/rock02.png']
    this.img.src = this.images[Math.floor(Math.random() * this.images.length)];

    this.img.frames = 3;
    this.img.frameIndex = 0;

    this.deepfactor = 0.6

}
Obstacle.prototype.draw = function() {

    //this.game.ctx.fillStyle = "brown";
    //this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)


    // SPRITES
    // this.game.ctx.drawImage(
    //     this.img,
    //     this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    //     0,
    //     Math.floor(this.img.width / this.img.frames),
    //     this.img.height,
    //     this.x,
    //     this.y,
    //     this.w,
    //     this.h
    // );
    // this.animateImg();

};
Obstacle.prototype.move = function() {
    this.x -= 2;
}

// Obstacle.prototype.animateImg = function() {
//     // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
//     if (this.game.framesCounter % 6 === 0) {
//         this.img.frameIndex += 1;

//         // Si el frame es el último, se vuelve al primero
//         if (this.img.frameIndex > 2) this.img.frameIndex = 0;
//     }
// }