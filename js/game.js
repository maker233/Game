function Game() {
    this.ctx = undefined
    this.canvas = undefined

    this.w = window.innerWidth - 10
    this.h = window.innerHeight - 10

    this.fps = 60
    this.score = 0
    this.interval = undefined
    this.player = undefined

    this.deadEnemies = [];


    this.music = new Audio();
    this.music2 = new Audio();
    //this.audiozombie.music = new Audio();

    //this.audiozombie.src = "audio/Run30.mp3"
    this.music.src = "audio/Run30.MOV"
    this.music2.src = "audio/gameover.wav"
        /*
        1. CREAR EL AUDIO
        this.audio = new Audio();
        this.audio.src = "tal.mp3"
        2. REPRODUCIR (CUANDO QUIERAS)
        this.audio.play();
        3. PARAR
        this.audio.pause();
        */

}

Game.prototype.init = function(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d');

        //Igualamos tamaño canvas a window
        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.refresh();

        this.music.play();

    }
    // REFRESH
    // REFRESH
Game.prototype.refresh = function() {

    this.reset();

    this.interval = setInterval(function() {

        this.clean();
        this.framesCounter++;

        if (this.framesCounter > 10000) {
            this.framesCounter = 0;
        }

        //generación de obstáculos
        if (this.framesCounter < 500 && this.framesCounter % 200 === 0) {
            this.generateZombie()
        } else if (
            this.framesCounter > 500 && this.framesCounter % 100 === 0) {
            this.generateZombie()
        } else if (
            this.framesCounter > 2000 && this.framesCounter % 80 === 0) {
            this.generateZombie()
        } else if (
            this.framesCounter > 6000 && this.framesCounter % 15 === 0) {
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
        this.player.currAmmo += 0.005;

    }.bind(this), 1000 / this.fps)
}


//COLISIONES

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

        this.audioZombie.play();
    }

    var collisionZvsO = this.isCollisionAll(this.zombies, this.obstacles);

    if (collisionZvsO) {
        this.deleteZombie(collisionZvsO[0])
        console.log("Zombie chocado")
    }

    var collisionBvsZ = this.isCollisionAll(this.zombies, this.player.bullets);

    if (collisionBvsZ) {
        //animación explotan
        console.log("Zombie disparado")
        this.deleteZombie(collisionBvsZ[0]);
        this.player.deleteBullet(collisionBvsZ[1])
    }

    var collisionBvsO = this.isCollisionAll(this.player.bullets, this.obstacles)

    if (collisionBvsO) { this.player.deleteBullet(collisionBvsZ[0]) }

}

Game.prototype.drawAll = function() {
    this.deadEnemies = this.deadEnemies.filter(function(enemy) {
        console.log(enemy.deadAnimation.frameIndex)
        return enemy.deadAnimation.frameIndex < 11;
    })

    //Ordenacion de profundidad
    var objects = [this.player];
    objects = objects.concat(this.obstacles, this.zombies, this.deadEnemies);

    objects = objects.sort(function(object1, object2) {
        object1.y - object2.y
    })

    //console.log(objects);


    this.background.draw()
        //this.player.draw()
    this.drawScore()

    // this.obstacles.forEach(function(elm) {
    //     elm.draw()
    // })
    // this.zombies.forEach(function(elm) {
    //     elm.draw()
    // })

    objects.forEach(function(object) {
        object.draw()
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
    // Game.prototype.pause() = function() {

// }

Game.prototype.reset = function() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.bullets = new Bullet(this)

    this.scoreBoard = ScoreBoard;
    this.scoreBoard.init();

    this.framesCounter = 0
    this.score = 0
    this.player.currAmmo = 5

    this.zombies = []
    this.obstacles = []
    this.bullets = []
}

Game.prototype.gameOver = function() {

    this.reset()
    console.log("GAME OVER, Try again")
    this.music.pause();
    this.music2.play();
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
    this.deadEnemies.push(this.zombies.splice(index, 1)[0]);
    this.deadEnemies[this.deadEnemies.length - 1].dead = true;

}


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
    fo.forEach(function(p, index1) {

        so.forEach(function(o, index2) {

            if (this._collision(p, o)) collision = [index1, index2];
        }.bind(this))
    }.bind(this))
    return collision
        //console.log(collision ? 'SI HAY COLISION' : 'NO HAY COLISION')
}

//REFACTORIZACIÓN DE COLISIONES

Game.prototype._collision = function(p, o) {
    return ((p.x + (p.w / 2)) > o.x &&
        (o.x + (o.w / 2)) > p.x &&
        ((p.y + (p.h / 2)) + (p.h / 2)) > (o.y + (o.h / 2)) &&
        ((o.y + (o.h / 2)) + (o.h / 2)) > (p.y + (p.h / 2)))
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