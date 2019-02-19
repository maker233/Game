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

    //this.setListeners();

}

Player.prototype.draw = function() {
    // this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

    // Eliminamos bullets fuera del canvas
    // this.bullets.filter(function(bullet) {
    //     return bullet.x > this.game.canvas.w;

    // }.bind(this));

    // Pintamos bullets y las movemos
    this.bullets.forEach(function(bullet) {
        bullet.draw();
        bullet.move();
    });


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
                console.log("Has pulsado space")
                this.shoot()
                break;
        }
    }.bind(this)
}

Player.prototype._moveUp = function() {
    //Bloqueo movimiento superior
    if (this.y < 400) {
        this.y = this.y
    } else {
        this.y -= 15
    }

}

Player.prototype._moveDown = function() {
    //Bloqueo movimiento inferior
    if (this.y < 600) {
        this.y += 15
    } else {
        this.y = this.y
    }

}
Player.prototype.shoot = function() {
    var bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2);

    this.bullets.push(bullet);

    console.log(this.bullets)
};