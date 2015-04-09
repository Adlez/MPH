mph.screens["unit-screen"] = (function ()
{
    var storage = mph.storage,
	    display = mph.display,
        game = mph.game,
		dom = mph.dom,
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
            Aegis: 30,
            Titav: 20,
            Velos: 10,
            displayVelos: 0,
            displayTitav: 0,
            displayAegis: 0,
            Units: []
        };


        gameLoop();
    }

    var previousTime = Date.now();


    function update() {

        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        //unitState.Velos += deltaTime;
        //createUnits();
        //displayUnits();

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
        dom.bind("#unit-screen button[name=CV]", "click",
           function ()
           {
               unitState.Units.push(Velos);
           }
           
        );
    };

    function displayUnits() {
        for (var index = 0; index < unitState.Units.length; index++)
        {
            if (unitState.Units[index] == 10) {
                unitState.displayVelos = unitState.Units[index];
                index++;
            }
        }
    };

    function destroyUnits () {

        for (var index = 0; index < unitState.Units.length; index++) {
            if (unitState.Units[0] == 10) {
                unitState.Units.slice(index);
            }
        }
    };

    function updateGameInfo() {
       $("#unit-screen .Velos span")[0].innerHTML = Math.floor(unitState.displayVelos);
       $("#unit-screen .Titav span")[0].innerHTML = Math.floor(unitState.displayTitav);
       $("#unit-screen .Aegis span")[0].innerHTML = Math.floor(unitState.displayAegis);

    }

    function togglePause(enable) {
        if (enable == paused) return; // no change

        var overlay = $("#unit-screen .pause-overlay")[0];
        paused = enable;
        overlay.style.display = paused ? "block" : "none";

        if (paused) {

            pauseTime = Date.now();
        } else {

            ;
        }
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        startGame();
    }

    function setup() {
        
        var backButton =
           $("#unitscreen footer button[name=back]")[0];
        dom.bind(backButton, "click", function(e) {
            game.showScreen("game-screen");
        });
    }

    return {
        run: run
    };

})();
    