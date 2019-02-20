var ScoreBoard = {
    init: function() {
        this.img = new Image();
        this.img.src = 'images/tacometro.png';
    },
    update: function(score, ctx) {
        ctx.font = "19px sans-serif";
        ctx.fillStyle = "red";
        ctx.fillText(Math.floor(score), 128, 165);
    },
    draw: function(ctx) {
        ctx.drawImage(this.img, 50, 50, 145, 145);
    }
}