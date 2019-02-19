function Obstacle(game) {
    this.game = game;

    this.x = 1000
    this.y = 400 + Math.random() * 200;
    //this.w = Math.random() * 100 + 50
    this.w = 50;
    this.h = 50;

}
Obstacle.prototype.draw = function() {

    this.game.ctx.fillStyle = "brown";
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

};
Obstacle.prototype.move = function() {
    this.x -= 2;
}