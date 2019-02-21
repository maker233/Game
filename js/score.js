var ScoreBoard = {
    init: function() {
        this.img = new Image();
        this.img2 = new Image();
        this.img.src = 'images/player/glassball.png';
        this.img2.src = 'images/player/fireball.png';
    },
    update: function(score, ctx) {
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "blue";
        ctx.fillText(Math.floor(score), 90, 110);
    },
    draw: function(ctx) {
        ctx.drawImage(this.img, 45, 40, 115, 130);
    },
    updateAmmo: function(ammo, ctx) {
        ctx.font = "35px sans-serif";
        ctx.fillStyle = "orange";
        ctx.fillText(Math.floor(game.player.currAmmo), 1300, 92);
    },
    drawAmmo: function(ctx) { //imagen balas
        ctx.drawImage(this.img2, 1200, 55, 70, 50);
    }
}