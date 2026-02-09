function Game() {
    this.ctx = undefined
    this.canvas = undefined

    this.w = window.innerWidth
    this.h = window.innerHeight

    this.fps = 60
    this.score = 0
    this.interval = undefined
    this.player = undefined

    this.deadEnemies = [];
    this.gameMode = "normal"; // normal or zombiewar
    this.currentCombo = 0;
    this.combosText = [];
    this.shakeIntensity = 0;
    this.isPaused = false;
    this.explosions = []; // Para efectos de explosión al matar zombies


    this.music0 = new Audio();
    this.music = new Audio();
    this.music2 = new Audio();
    this.audioZombie = new Audio();

    this.music0.src = "audio/battleready.mp3"
    this.music.src = "audio/Run30.mp3"
    this.music2.src = "audio/gameover.wav"
    this.audioZombie.src = "audio/Fireball.wav" // sonido cuando zombie te come
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
        
        // Detectar modo de juego
        this.gameMode = (id === "zombiewar") ? "zombiewar" : "normal";

        //Igualamos tamaño canvas a window
        this.canvas.width = this.w;
        this.canvas.height = this.h;

        // Audio moderno con promesa para navegadores 2026
        const playAudio = async () => {
            try {
                this.music0.volume = 0.3; // Volumen más suave
                await this.music0.play();
            } catch (error) {
                console.log('Audio autoplay bloqueado - se reproducirá al interactuar:', error);
            }
        };
        playAudio();

        this.refresh();
        
        // ⏸️ Sistema de pausa con P o Escape
        document.addEventListener('keydown', function(e) {
            if (e.code === 'KeyP' || e.code === 'Escape') {
                this.togglePause();
            }
        }.bind(this));
    }
    // REFRESH
    // REFRESH
Game.prototype.refresh = function() {
    this.music0.pause();
    // Audio moderno con promesa
    const playMusic = async () => {
        try {
            this.music.volume = 0.4; // Volumen más suave para música de fondo
            this.music.loop = true; // Loop infinito
            await this.music.play();
        } catch (error) {
            console.log('Audio play bloqueado:', error);
        }
    };
    playMusic();

    this.reset();

    this.interval = setInterval(function() {

        this.clean();
        this.framesCounter++;

        if (this.framesCounter > 10000) {
            this.framesCounter = 0;
        }

        // Generación de zombies - DIFERENTE para cada modo!
        if (this.gameMode === "zombiewar") {
            // MODO ZOMBIEWAR: ¡Oleadas masivas de zombies, SIN obstáculos!
            if (this.framesCounter < 300 && this.framesCounter % 120 === 0) {
                this.generateZombie()
            } else if (this.framesCounter > 300 && this.framesCounter % 80 === 0) {
                this.generateZombie()
            } else if (this.framesCounter > 1000 && this.framesCounter % 40 === 0) {
                this.generateZombie()
            } else if (this.framesCounter > 3000 && this.framesCounter % 20 === 0) {
                this.generateZombie()
            } else if (this.framesCounter > 5000 && this.framesCounter % 10 === 0) {
                this.generateZombie()
            }
            // Sin obstáculos en modo ZombieWar
        } else {
            // MODO NORMAL: Como siempre
            if (this.framesCounter < 500 && this.framesCounter % 200 === 0) {
                this.generateZombie()
            } else if (
                this.framesCounter > 500 && this.framesCounter % 150 === 0) {
                this.generateZombie()
            } else if (
                this.framesCounter > 2000 && this.framesCounter % 80 === 0) {
                this.generateZombie()
            } else if (
                this.framesCounter > 6000 && this.framesCounter % 15 === 0) {
                this.generateZombie()
            }

            if (this.framesCounter % 250 === 0) {
                this.generateObstacle()
            }
        }

        //Metodos a ejecutar por ciclo
        this.drawAll()
        this.moveAll()
        this.checkAllCollisions()
        this.updateCombos()
        this.updateExplosions()

        this.score += 0.05;
        this.player.currAmmo += 0.002;

    }.bind(this), 1000 / this.fps)
}


//COLISIONES

Game.prototype.checkAllCollisions = function() {
    if (this.isCollisionPvO()) {
        //alert("Te has chocado")
        console.log("Te has chocado")
        this.currentCombo = 0; // Reset combo on hit
        this.triggerScreenShake(8);
        this.gameOver()
    }
    if (this.isCollisionZvP()) {
        //animación te comen
        //alert("Te han comido")
        console.log("Te han comido")
        this.currentCombo = 0; // Reset combo on hit
        this.triggerScreenShake(12);
        this.gameOver()

        // Audio moderno con promesa
        const playZombieSound = async () => {
            try {
                this.audioZombie.volume = 0.4; // Volume suave
                await this.audioZombie.play();
            } catch (error) {
                console.log('Audio zombie bloqueado:', error);
            }
        };
        playZombieSound();
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
        this.player.deleteBullet(collisionBvsZ[1]);
        
        // ¡SISTEMA DE COMBOS!
        this.currentCombo++;
        if (this.currentCombo >= 3) {
            this.addComboText("COMBO x" + this.currentCombo + "!", this.canvas.width / 2, this.canvas.height / 2);
            this.score += this.currentCombo * 10; // Bonus score por combo!
        }
    }

    var collisionBvsO = this.isCollisionAll(this.player.bullets, this.obstacles)

    if (collisionBvsO) { this.player.deleteBullet(collisionBvsO[1]) }

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

    // ¡SCREEN SHAKE antes de dibujar!
    var hasShake = this.updateScreenShake();

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
    
    // ¡Dibujar combos épicos!
    this.drawCombos()
    
    // ¡Dibujar explosiones épicas!
    this.drawExplosions()
    
    // Restaurar transformación si hay shake
    if (hasShake) {
        this.endScreenShake();
    }
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
    this.currentCombo = 0
    this.combosText = []
    this.explosions = []
    this.shakeIntensity = 0
    this.isPaused = false
}

Game.prototype.gameOver = function() {
    clearInterval(this.interval)

    console.log("GAME OVER, Try again")

    // ¡GAME OVER ÉPICO!
    this.drawEpicGameOver();

    document.querySelector('.gameover').style.display = "flex"

    this.music.pause();
    // Audio moderno con promesa
    const playGameOver = async () => {
        try {
            this.music2.volume = 0.5;
            await this.music2.play();
        } catch (error) {
            console.log('Audio gameOver bloqueado:', error);
        }
    };
    playGameOver();
}

Game.prototype.drawEpicGameOver = function() {
    // Fondo semi-transparente
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.save();
    this.ctx.textAlign = "center";
    
    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;
    
    // GAME OVER en grande
    this.ctx.font = "bold 96px sans-serif";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 6;
    this.ctx.strokeText("GAME OVER", centerX, centerY - 50);
    this.ctx.fillText("GAME OVER", centerX, centerY - 50);
    
    // Score final
    this.ctx.font = "bold 48px sans-serif";
    this.ctx.fillStyle = "#FFD700";
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 3;
    var finalScore = "SCORE: " + Math.floor(this.score);
    this.ctx.strokeText(finalScore, centerX, centerY + 20);
    this.ctx.fillText(finalScore, centerX, centerY + 20);
    
    // Modo de juego
    var modeText = this.gameMode === "zombiewar" ? "ZOMBIE WAR MODE!" : "NORMAL MODE";
    this.ctx.font = "24px sans-serif";
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillText(modeText, centerX, centerY + 60);
    
    this.ctx.restore();
}

// 💥 SISTEMA DE EXPLOSIONES ÉPICAS
Game.prototype.createExplosion = function(x, y) {
    for (var i = 0; i < 12; i++) {
        this.explosions.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 30,
            maxLife: 30,
            color: ['#FF4500', '#FFD700', '#FF6347', '#FFA500'][Math.floor(Math.random() * 4)]
        });
    }
}

Game.prototype.updateExplosions = function() {
    this.explosions = this.explosions.filter(function(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.2; // Gravedad
        particle.life--;
        return particle.life > 0;
    });
}

Game.prototype.drawExplosions = function() {
    var ctx = this.ctx;
    this.explosions.forEach(function(particle) {
        ctx.save();
        ctx.globalAlpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
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
    var zombie = this.zombies[index];
    // ¡Explosión de partículas épica!
    this.createExplosion(zombie.x + zombie.w/2, zombie.y + zombie.h/2);
    
    this.deadEnemies.push(this.zombies.splice(index, 1)[0]);
    this.deadEnemies[this.deadEnemies.length - 1].dead = true;
}

// ¡SISTEMA DE COMBOS ÉPICO!
Game.prototype.addComboText = function(text, x, y) {
    this.combosText.push({
        text: text,
        x: x,
        y: y,
        alpha: 1.0,
        timer: 120 // frames to show
    });
}

Game.prototype.updateCombos = function() {
    // Actualizar y filtrar textos de combo
    this.combosText = this.combosText.filter(function(combo) {
        combo.timer--;
        combo.alpha = combo.timer / 120; // Fade out
        combo.y -= 1; // Float up
        return combo.timer > 0;
    });
}

Game.prototype.drawCombos = function() {
    var ctx = this.ctx;
    this.combosText.forEach(function(combo) {
        ctx.save();
        ctx.globalAlpha = combo.alpha;
        ctx.font = "bold 48px sans-serif";
        ctx.fillStyle = "#FFD700"; // Golden color
        ctx.strokeStyle = "#FF4500"; // Orange stroke
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        
        // Stroke first, then fill for better visibility
        ctx.strokeText(combo.text, combo.x, combo.y);
        ctx.fillText(combo.text, combo.x, combo.y);
        ctx.restore();
    });
}

// ¡SCREEN SHAKE ÉPICO!
Game.prototype.triggerScreenShake = function(intensity) {
    this.shakeIntensity = intensity;
}

Game.prototype.updateScreenShake = function() {
    if (this.shakeIntensity > 0) {
        var shakeX = (Math.random() - 0.5) * this.shakeIntensity;
        var shakeY = (Math.random() - 0.5) * this.shakeIntensity;
        
        this.ctx.save();
        this.ctx.translate(shakeX, shakeY);
        
        this.shakeIntensity *= 0.9; // Decay
        if (this.shakeIntensity < 0.1) this.shakeIntensity = 0;
        
        return true; // Indica que hay shake activo
    }
    return false;
}

Game.prototype.endScreenShake = function() {
    if (this.shakeIntensity > 0) {
        this.ctx.restore();
    }
}

// ⏸️ SISTEMA DE PAUSA
Game.prototype.togglePause = function() {
    if (this.isPaused) {
        // Reanudar
        this.isPaused = false;
        this.music.play();
        this.refresh(); // Restart game loop
    } else {
        // Pausar
        this.isPaused = true;
        this.music.pause();
        clearInterval(this.interval);
        
        // Mostrar mensaje de pausa
        this.ctx.save();
        this.ctx.font = "bold 64px sans-serif";
        this.ctx.fillStyle = "#FFD700";
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 4;
        this.ctx.textAlign = "center";
        
        var pauseText = "PAUSED";
        var x = this.canvas.width / 2;
        var y = this.canvas.height / 2;
        
        this.ctx.strokeText(pauseText, x, y);
        this.ctx.fillText(pauseText, x, y);
        
        this.ctx.font = "24px sans-serif";
        this.ctx.fillText("Presiona P o Escape para continuar", x, y + 50);
        this.ctx.restore();
    }
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