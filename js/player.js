function Player(game) {
    this.game = game;

    this.w = 40
    this.h = 40

    this.x = this.game.w / 2 - this.w / 2
    this.y = this.game.h * 0.75 - this.h / 2

    this.health = 5 // daño de obtaculos débiles

    this.img = new Image();
    this.img.src = 'images/player.png';

    this.bullets = [];

    //SPRITES número de imágenes diferentes
    this.img.frames = 3;
    this.img.frameIndex = 0;

    //this.setListeners();

}

Player.prototype.draw = function() {
    // this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    // this.game.ctx.fillStyle = "black";
    // this.game.ctx.fillRect(this.x, this.y, this.w, this.h);



    // Pintamos bullets y las movemos
    this.bullets.forEach(function(bullet) {
        bullet.draw();
        bullet.move();
    });

    // SPRITES

    //Eliminamos bullets fuera del canvas, no funciona
    this.bullets.filter(function(bullet) {
        return bullet.x > this.game.canvas.w;
    }.bind(this));

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

Player.prototype.move = function() {

    document.onkeyup = function(e) {

        switch (e.keyCode) {
            case 38:
                this._moveUp()
                break;
            case 40:
                this._moveDown()
                break;
            case 32: //space
                //console.log("Has pulsado space")
                this.shoot()
                break;
            case 37:
                //console.log("Has pulsado izquierda")
                //this._moveLeft()
                break;
            case 39:
                //console.log("Has pulsado derecha")
                //this._moveRight()
                break;
        }
    }.bind(this)
}

Player.prototype._moveUp = function() {
    //Bloqueo movimiento superior
    if (this.y < 490) {
        this.y = this.y
    } else {
        this.y -= 15
    }

}

Player.prototype._moveDown = function() {
    //Bloqueo movimiento inferior
    if (this.y < 650) {
        this.y += 15
    } else {
        this.y = this.y
    }

}

Player.prototype._moveRight = function() {
    //Bloqueo movimiento superior
    if (this.x > 1000) {
        this.x = this.x
    } else {
        this.x += 15
    }

}

Player.prototype._moveLeft = function() {
    //Bloqueo movimiento superior
    if (this.x < 200) {
        this.x = this.y
    } else {
        this.x -= 15
    }

}
Player.prototype.shoot = function() {
    var bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2);

    this.bullets.push(bullet);

    console.log(this.bullets)
};
Player.prototype.animateImg = function() {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (this.game.framesCounter % 6 === 0) {
        this.img.frameIndex += 1;

        // Si el frame es el último, se vuelve al primero
        if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
};