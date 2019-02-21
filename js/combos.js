function Combos(game) {
    this.game = game;

    this.x = 0
    this.y = 0

    this.w = 300
    this.h = 150

    this.message = "Combo!"
    this.message10 = "Combo x10!"

}

Combos.prototype.draw = function() {

}

Combos.prototype._combo10 = function() {
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "red";
    ctx.fillText(this.message10, 128, 165);

    this.rewards()
};

Combos.prototype.rewards = function() {
    this.score += 500
}