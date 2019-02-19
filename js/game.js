function Game() {
    this.ctx = undefined
    this.canvas = undefined

    this.w = window.innerWidth - 10
    this.h = window.innerHeight - 10

    this.fps = 60
    this.score = 0
    this.interval = undefined
    this.player = undefined

    this.keys = {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        SPACE: 32
    }

}

Game.prototype.init = function(id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d');

    //Igualamos tamaño canvas a window
    this.canvas.width = this.w;
    this.canvas.height = this.h;

    this.refresh();

}

Game.prototype.refresh = function() {

    this.reset();

    this.interval = setInterval(function() {

        this.clean();
        this.framesCounter++;

        if (this.framesCounter > 1000) {
            this.framesCounter = 0;
        }

        // controlamos la velocidad de generación de obstáculos
        if (this.framesCounter % 120 === 0) {
            this.generateZombie()
        }

        if (this.framesCounter % 200 === 0) {
            this.generateObstacle()
        }

        this.drawAll()
        this.moveAll()

        this.score += 0.01;


        if (this.isCollisionAll(this.player, this.obstacle)) {
            alert("Te has chocado")
            this.gameOver()
        }

        // REFACTORIZANDO
        // REFACTORIZANDO

        // if (this.isCollisionPvO()) {
        //     alert("Te has chocado")
        //     this.gameOver()
        // }
        if (this.isCollisionZvP()) {
            //animación te comen
            alert("Te han comido")
            this.gameOver()

        }
        if (this.isCollisionZvO()) {
            //animación explotan
            this.deleteZombie()
            console.log("Hasta luego zombi!")
        }

    }.bind(this), 1000 / this.fps)
}

Game.prototype.drawAll = function() {

    this.background.draw()
    this.player.draw()
    this.drawScore()

    this.obstacles.forEach(function(elm) {
        elm.draw()
    })
    this.zombies.forEach(function(elm) {
        elm.draw()
    })

}

Game.prototype.moveAll = function() {

    this.background.move()
    this.player.move()
    this.obstacles.forEach(function(elm) {
        elm.move()
    })
    this.zombies.forEach(function(elm) {
        elm.move()
    })
}
Game.prototype.clean = function() {
    this.ctx.clearRect(0, 0, this.w, this.h);
}

Game.prototype.reset = function() {
    this.background = new Background(this);
    this.player = new Player(this);

    this.scoreBoard = ScoreBoard
    this.framesCounter = 0

    this.zombies = []
    this.obstacles = []

}

Game.prototype.gameOver = function() {
    alert("GAME OVER, Try again")
    this.reset();
}

Game.prototype.drawScore = function() {
    this.scoreBoard.update(this.score, this.ctx)
}

// GENERADORES DE ELEMENTOS
// GENERADORES DE ELEMENTOS

Game.prototype.generateObstacle = function() {
    //console.log(this.obstacles)
    this.obstacles.push(new Obstacle(this));
}
Game.prototype.generateZombie = function() {
    //console.log(this.zombies)
    this.zombies.push(new Zombie(this));
}

Game.prototype.deleteZombie = function() {
    //console.log(this.zombies)
    this.zombies.pop();
}


// COLISIONES - HERE'RE BE DRAGONS
// COLISIONES - HERE'RE BE DRAGONS
// COLISIONES - HERE'RE BE DRAGONS
// COLISIONES - HERE'RE BE DRAGONS

Game.prototype.isCollisionPvO = function() {

    return this.obstacles.some(function(obstacle) {
        return (
            ((this.player.x + this.player.w) >= obstacle.x &&
                this.player.x < (obstacle.x + obstacle.w) &&
                this.player.y + (this.player.h) >= obstacle.y) &&
            (obstacle.y + obstacle.h) > this.player.y);
    }.bind(this));
}

Game.prototype.isCollisionZvP = function() {

    return this.zombies.some(function(zombie) {
        return (
            ((zombie.x + zombie.w) >= this.player.x &&
                zombie.x < (this.player.x + this.player.w) &&
                zombie.y + (zombie.h) >= this.player.y) &&
            (this.player.y + this.player.h) > zombie.y);
    }.bind(this));
}

Game.prototype.isCollisionZvO = function() {

    zombies.forEach(function(i) {

        this.obstacles.some(function(obstacle) {
            return this.collision(this.zombies, this.obstacles)

        }.bind(this));
    })
}

//REFACTORIZACIÓN DE COLISIONES
//REFACTORIZACIÓN DE COLISIONES

Game.prototype.isCollisionAll = function(fo, so) {

    fo.forEach(function(p) {

        this.so.forEach(function(o) {

            this._collision(p, o)
        })
    })
}



Game.prototype._collision = function(p, o) {
    return ((p.x + p.w) > o.x &&
        (o.x + o.w) > p.x &&
        (p.y + p.h) > o.y &&
        (o.y + o.h) > p.y)
}