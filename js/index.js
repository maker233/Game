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
        game.init("warmode");
    }

    document.querySelector('#btn-reset').onclick = function() {
        game.reset();
        game.refresh();
        game.music2.pause();
        document.querySelector('.gameover').style.display = 'none'
    }

    document.querySelector('#btn-howto').onclick = function() {

        document.querySelector('.gameover').style.display = 'none'
        document.querySelector('#gui-start').style.display = 'none';
        document.querySelector('.instrucciones').style.display = 'block'
    }
    document.querySelector('#btn-closehowto').onclick = function() {

        document.querySelector('.gameover').style.display = 'none'
        document.querySelector('#gui-start').style.display = 'flex';
        document.querySelector('.instrucciones').style.display = 'none'
    }

    // particlesJS.load('particles-js', 'config/particles.json', function() {
    //     console.log('callback - particles.js config loaded');
    // });


};