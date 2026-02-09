window.onload = function() {
    var start = document.getElementById("gui-start");
    var button = document.querySelector("#btn-start");

    console.log(button)

    button.onclick = function() {

        start.style.display = "none"
            //setAttribute(display, none)
        game = new Game();
        game.init("batman");

        var frameid = document.querySelector('#iframeAudio');
        frameid.parentNode.removeChild(frameid);
    }

    var warMode = document.querySelector("#btn-zombiewar");
    warMode.onclick = function() {

        start.style.display = "none"
            //setAttribute(display, none)
        game = new Game();
        game.init("zombiewar");
    }

    document.querySelector('#btn-reset').onclick = function() {
        // Reset épico completo
        game.isPaused = false;
        clearInterval(game.interval); // Por si acaso
        game.reset();
        game.refresh();
        game.music2.pause();
        document.querySelector('.gameover').style.display = 'none';
        
        // Limpiar canvas completamente
        game.clean();
    }

    // How to play buttons - commented out in HTML
    var howtoBtn = document.querySelector('#btn-howto');
    if (howtoBtn) {
        howtoBtn.onclick = function() {
            document.querySelector('.gameover').style.display = 'none'
            document.querySelector('#gui-start').style.display = 'none';
            document.querySelector('.instrucciones').style.display = 'block'
        }
    }
    
    var closeHowtoBtn = document.querySelector('#btn-closehowto');
    if (closeHowtoBtn) {
        closeHowtoBtn.onclick = function() {
            document.querySelector('.gameover').style.display = 'none'
            document.querySelector('#gui-start').style.display = 'flex';
            document.querySelector('.instrucciones').style.display = 'none'
        }
    }

    // ✨ Particles épicas en el fondo!
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80 },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.2,
                "anim": { "enable": true, "speed": 1 }
            },
            "size": {
                "value": 1,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            }
        }
    });


};