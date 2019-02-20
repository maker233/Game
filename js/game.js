function Game() {
    this.ctx = undefined
    this.canvas = undefined

    this.w = window.innerWidth - 10
    this.h = window.innerHeight - 10

    this.fps = 60
    this.score = 0
    this.ammo = 0
    this.interval = undefined
    this.player = undefined

}

Game.prototype.init = function(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d');

        //Igualamos tamaño canvas a window
        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.refresh();

    }
    // REFRESH
    // REFRESH
Game.prototype.refresh = function() {

    this.reset();

    this.interval = setInterval(function() {

        this.clean();
        this.framesCounter++;

        if (this.framesCounter > 5000) {
            this.framesCounter = 0;
        }

        //generación de obstáculos
        if (this.framesCounter < 500 && this.framesCounter % 200 === 0) {
            this.generateZombie()
        } else if (
            this.framesCounter > 500 && this.framesCounter % 65 === 0) {
            this.generateZombie()
        } else if (
            this.framesCounter > 2000 && this.framesCounter % 15 === 0) {
            this.generateZombie()
        }

        if (this.framesCounter % 300 === 0) {
            this.generateObstacle()
        }

        //Metodos a ejecutar por ciclo
        this.drawAll()
        this.moveAll()
        this.checkAllCollisions()

        this.score += 0.05;
        this.ammo += 0.001;

    }.bind(this), 1000 / this.fps)
}




Game.prototype.checkAllCollisions = function() {
    if (this.isCollisionPvO()) {
        //alert("Te has chocado")
        console.log("Te has chocado")
        this.gameOver()
    }
    if (this.isCollisionZvP()) {
        //animación te comen
        //alert("Te han comido")
        console.log("Te han comido")
        this.gameOver()
    }

    if (this.isCollisionAll(this.zombies, this.obstacles) === true) {
        //animación te comen
        console.log("Zombie chocado")
        this.deleteZombie()
    }

    if (this.isCollisionAll(this.zombies, this.player.bullets) === true) {
        //animación explotan
        console.log("Zombie disparado")
        this.deleteZombie()
    }

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

Game.prototype.drawScore = function() {
    this.scoreBoard.draw(this.ctx)
    this.scoreBoard.update(this.score, this.ctx)

    this.scoreBoard.drawAmmo(this.ctx)
    this.scoreBoard.updateAmmo(this.ammo, this.ctx)
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
    this.bullets = new Bullet(this)

    this.scoreBoard = ScoreBoard;
    this.scoreBoard.init();

    this.framesCounter = 0
    this.score = 0
    this.ammo = 3

    this.zombies = []
    this.obstacles = []
    this.bullets = []

}

Game.prototype.gameOver = function() {
    console.log("GAME OVER, Try again")
    this.reset();
}


// GENERADORES DE ELEMENTOS

Game.prototype.generateObstacle = function() {
    //console.log(this.obstacles)
    this.obstacles.push(new Obstacle(this));
}
Game.prototype.generateZombie = function() {
    //console.log(this.zombies)
    this.zombies.push(new Zombie(this));
}

Game.prototype.deleteZombie = function(index) {
    this.zombies.splice(index, 1)
}


// COLISIONES - HERE'RE BE DRAGONS
// COLISIONES - HERE'RE BE DRAGONS
// COLISIONES - HERE'RE BE DRAGONS
// COLISIONES - HERE'RE BE DRAGONS

Game.prototype.isCollisionPvO = function() {
    //Player vs Obstacles
    return this.obstacles.some(function(obstacle) {
        return this._collision(obstacle, this.player)
    }.bind(this));
}

Game.prototype.isCollisionZvP = function() {
    //Zombies vs Player
    return this.zombies.some(function(zombie) {
        return this._collision(zombie, this.player)
    }.bind(this));
}

//REFACTORIZACIÓN DE COLISIONES

Game.prototype.isCollisionAll = function(fo, so) {
    var collision = false;
    fo.forEach(function(p) {

        so.forEach(function(o) {

            if (this._collision(p, o)) collision = true;
        }.bind(this))
    }.bind(this))
    return collision
        //console.log(collision ? 'SI HAY COLISION' : 'NO HAY COLISION')
}

//REFACTORIZACIÓN DE COLISIONES

Game.prototype._collision = function(p, o) {
    return ((p.x + p.w) > o.x &&
        (o.x + o.w) > p.x &&
        (p.y + p.h) > o.y &&
        (o.y + o.h) > p.y)
}

Game.prototype.indexCollision = function() {
        var contadorColisiones = 0;
        for (var i = 0; i < this.zombies.length;) {
            if (this.isCollisionAll()) {
                contadorColisiones++
            }
        }
        if (contadorColisiones > 0) {} //llamar sonido!
    }
    /*
    {
        "levels": {
            "background": "url/tal.png", 
            "enemies": {
                image: "tal", 
                health: 200, 
                
            }, 
            "obstacles": ".."
        }
    }
    */