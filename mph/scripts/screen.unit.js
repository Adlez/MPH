
mph.screens["unit-screen"] = (function ()
{
    var settings = mph.settings,
	    storage = mph.storage,
	    display = mph.display,
		input = mph.input,
	    dom = mph.dom,
	    audio = mph.audio,
	    $ = dom.$,
	    firstRun = true,
	    paused = false,
	    pauseTime;


    function gameLoop()
    {
        window.requestAnimationFrame(gameLoop, display.canvas);
        update();

    }

    function startGame()
    {
        unitState = 
        {
            Aegis: POWER_A,
            Titav: POWER_T,
            Velos: POWER_V,
            displayVelos: 0,
            Units: []
        };


        //audio.initialize();
        gameLoop();
    }

    var previousTime = Date.now();


    function update() {

        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        //unitState.Velos += deltaTime;

        //console.log(gameState.mcStoredFood);

        window.requestAnimationFrame(update);
        window.requestAnimationFrame(updateGameInfo);
    }

    function announce(str) {
        var element = $("#unit-screen .announcement")[0];
        element.innerHTML = str;
        if (Modernizr.cssanimations) {
            dom.removeClass(element, "zoomfade");
            setTimeout(function () {
                dom.addClass(element, "zoomfade");
            }, 1);
        } else {
            dom.addClass(element, "active");
            setTimeout(function () {
                dom.removeClass(element, "active");
            }, 1000);
        }
    }

    function createUnits () 
    {
        dom.bind("#game-screen button[name=exit]", "click",
           function () 
           {
               Units.push(Velos);
           }
        );
        

    };

    function displayUnits() {
        for (var index = 0; index < this.Units.length; index++) {
            unitState.displayVelos = Units[index];
        }
    };

    function destroyUnits () {

        for (var index = 0; index < this.Units.length; index++) {
            if (Units[0] == POWER_V) {
                Units.slice(0);
            }
        }
    };

    function updateGameInfo() {
       $("#unit-screen .Velos span")[0].innerHTML = Math.floor(unitState.displayVelos);
       $("#unit-screen .Titav span")[0].innerHTML = Math.floor(unitState.Titav);
       $("#unit-screen .Aegis span")[0].innerHTML = Math.floor(unitState.Aegis);

    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        startGame();
    }

    function setup() {
        input.initialize();

        dom.bind("#game-screen button[name=exit]", "click",
            function () {
                
                var exitGame = window.confirm(
                "Do you want to return to the game screen?"
            );
                
                if (exitGame) {
                    mph.game.showScreen("game-screen")
                }
            }
        );
    }

    return {
        run: run
    };

})();
    