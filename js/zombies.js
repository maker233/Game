function Zombie(game) {
    this.game = game;

    /*
    this.audio = new Audio();
    this.audio.src = "audio/audio.mp3"
    */

    this.enemies = [{
            src: 'tarad.png',
            frames: 12,
            w: 1,
            h: 4
        },
        {
            src: 'tarad2.png',
            frames: 12,
            w: 1,
            h: 4
        }
    ]

    this.enemy = this.enemies[Math.floor(Math.random() * this.enemies.length)]

    this.x = 10
    this.y = 400 + Math.random() * 200;
    //this.w = Math.random() * 100 + 50
    this.w = 90;
    // this.w = this.enemy.w
    this.h = 90;

    this.images = ['images/player/trolrun.png', 'images/sprites/gobrun.png']

    this.img = new Image();
    this.img2 = new Image();
    this.img2.src = 'images/sprites/zombieboy.png';
    this.img.src = this.images[Math.floor(Math.random() * this.images.length)];
    //this.img.src = this.enemy.src

    // img2 sprite muerte zombie

    // número de imágenes diferentes
    this.img.frames = 12;
    this.img.frameIndex = 0;

    this.deadAnimation = new Image();
    this.deadAnimation.src = 'images/18.png';
    this.deadAnimation.frames = 12;
    this.deadAnimation.frameIndex = 0;
    this.dead = false;

}
Zombie.prototype.draw = function() {
    if (this.dead) {

        this.game.ctx.drawImage(
            this.deadAnimation,
            this.deadAnimation.frameIndex * Math.floor(this.deadAnimation.width / this.deadAnimation.frames),
            0,
            Math.floor(this.deadAnimation.width / this.deadAnimation.frames),
            this.deadAnimation.height,
            this.x,
            this.y,
            this.w,
            this.h
        );

        this.animateImg(this.deadAnimation);
    } else {
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
        this.animateImg(this.img);
    }

};
Zombie.prototype.move = function() {

    if (this.y < this.game.player.y) {
        this.y += 0.5
    } else {
        this.y -= 0.5
    }
    this.x += 1;
}

Zombie.prototype.animateImg = function(img) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (this.game.framesCounter % 6 === 0) {
        img.frameIndex += 1;

        // Si el frame es el último, se vuelve al primero
        if (img.frameIndex > 11) img.frameIndex = 0;
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