var ScoreBoard = {
    init: function() {
        this.img = new Image();
        this.img2 = new Image();
        this.img.src = 'images/tacometro.png';
        this.img2.src = 'images/ammo.png';
    },
    update: function(score, ctx) {
        ctx.font = "19px sans-serif";
        ctx.fillStyle = "red";
        ctx.fillText(Math.floor(score), 118, 165);
    },
    draw: function(ctx) {
        ctx.drawImage(this.img, 50, 50, 145, 145);
    },
    updateAmmo: function(ammo, ctx) {
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "orange";
        ctx.fillText(Math.floor(ammo), 1010, 92);
    },
    drawAmmo: function(ctx) { //imagen balas
        ctx.drawImage(this.img2, 950, 50, 50, 50);
    }
}