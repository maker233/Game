var ScoreBoard = {
    init: function() {
        this.img = new Image();
        this.img2 = new Image();
        this.img.src = 'images/player/glassball.png';
        this.img2.src = 'images/player/fireball.png';
    },
    update: function(score, ctx) {
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "#130f40";
        ctx.fillText(Math.floor(score), 86, 107);
    },
    draw: function(ctx) {
        ctx.drawImage(this.img, 45, 40, 115, 130);
    },
    updateAmmo: function(ammo, ctx) {
        ctx.font = "35px sans-serif";
        ctx.fillStyle = "orange";
        // Posición responsive: canvas width - offset
        var textX = game.canvas.width - 100;
        ctx.fillText(Math.floor(game.player.currAmmo), textX, 92);
    },
    drawAmmo: function(ctx) { //imagen balas
        // Posición responsive: canvas width - offset
        var imgX = game.canvas.width - 200;
        ctx.drawImage(this.img2, imgX, 55, 70, 50);
    }
}