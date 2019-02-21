window.onload = function() {
    var start = document.getElementById("gui-start");
    var button = document.querySelector("#btn-start");

    console.log(button)

    button.onclick = function() {

        start.style.display = "none"
            //setAttribute(display, none)
    }

    game = new Game();
    game.init("batman");

    // particlesJS.load('particles-js', 'config/particles.json', function() {
    //     console.log('callback - particles.js config loaded');
    // });
};