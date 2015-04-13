mph.screens["unit-screen"] = (function ()
{
    var storage = mph.storage,
	    display = mph.display,
        game = mph.game,
		dom = mph.dom,
	    $ = dom.$,
        enemy = mph.enemyColony,
        firstRun = true,
	    paused = false,
	    pauseTime;


    function gameLoop()
    {
        window.requestAnimationFrame(gameLoop, display.canvas);
        update();
       
    }

    createUnits();

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
            displayPower: 0,
            finalPower: 0,
            victory: false,
            loser: false,
            Power: 100,
            currMat: 1000,
            //currFood: objMainColony.mcStoredFood,
            //currMat: objMainColony.mcStoredMaterial,
            Units: [],
            isClicked: false
        };


        gameLoop();
    }

    var previousTime = Date.now();


    function update() {

        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        //unitState.Velos += deltaTime;
        //createUnits();
        totalPower();
        displayUnits();

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

    function createVelos() {
        unitState.Units.push(unitState.Velos);
    };

    function createTitav() {
       unitState.Units.push(unitState.Titav);
    };

    function createAegis() {
       unitState.Units.push(unitState.Aegis);
    };

    function createUnits () 
    {

        var CVButton =
            $("#unit-screen button[name=CreateVelos]")[0];
        dom.bind(CVButton, "click", function (e) {
            unitState.isClicked = true;
            checkIfCanAffordVelos();
        });

        var CTButton =
            $("#unit-screen button[name=CreateTitav]")[0];
        dom.bind(CTButton, "click", function (e) {
            checkIfCanAffordTitav();
        });

        var CAButton =
            $("#unit-screen button[name=CreateAegis]")[0];
        dom.bind(CAButton, "click", function (e) {
            checkIfCanAffordAegis();
        });

         /*dom.bind("#unit-screen button[name=CreateVelos]", "click",
           function ()
           {
               unitState.isClicked = true;
               if (unitState.isClicked == true)
               {
                   unitState.Units.push(unitState.Velos);
               }
               unitState.isClicked = false;
               
           }
           
        );*/
        
        
    };

    function checkIfCanAffordVelos()
    {
        if (unitState.currMat >= 100) {
            createVelos();
            unitState.displayVelos += 1;
        }
        else {
            ifCantAfford();
        }
    };
    function checkIfCanAffordTitav()
    {
        if(unitState.currMat >= 250)
        {
            createTitav();
        }
        else {
            ifCantAfford();
        }
    };
    function checkIfCanAffordAegis() {
        if (unitState.currMat >= 500) {
            createAegis();
        }
        else {
            ifCantAfford();
        }
    };

    function ifCantAfford()
    {
        var tooPoor = window.confirm(
             "You can't afford this unit.....loser!");
    }

    function displayUnits() {
        for (var index = 0; index < unitState.Units.length; index++)
        {
            if (unitState.Units[index] == 10) {
                unitState.displayVelos = (unitState.Units[index] / 10);
                //unitState.displayPower += unitState.Units[index];
                index++;
            }
            if (unitState.Units[index] == 20) {
                unitState.displayTitav = (unitState.Units[index] / 20);
                //unitState.displayPower += unitState.Units[index];
                index++;
            }
            if (unitState.Units[index] == 30) {
                unitState.displayAegis = (unitState.Units[index] / 30);
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

    function totalPower()
    {
        unitState.displayPower = (unitState.displayVelos * 10) + (unitState.displayTitav * 20) + (unitState.displayAegis * 30);
    }

    Attack();

    function Attack()
    {
        var attackButton =
            $("#unit-screen button[name=Attack]")[0];
        dom.bind(attackButton, "click", function (e) {
            decideBattle();
        });
    }

    function decideBattle() {
        unitState.finalPower = unitState.displayPower;
        unitState.finalPower - unitState.Power;
        if (unitState.finalPower <= 0) {
            unitState.victory = true;
        }

        if (unitState.finalPower >= 1) {
            unitState.loser = true;
        }

        showAttackResult();
    }

    function showAttackResult()
    {
        if (unitState.victory == true) {
            var victoryW = window.confirm(
             "You are SUPER coolz! Oh and you defeated the enemy colony. Good job.");
        }

        if (unitState.loser == true) {
            var loserW = window.confirm(
             "You lost, everyone is dead....good job?");
        }
    }

    function updateGameInfo() {
       $("#unit-screen .Velos span")[0].innerHTML = Math.floor(unitState.displayVelos);
       $("#unit-screen .Titav span")[0].innerHTML = Math.floor(unitState.displayTitav);
       $("#unit-screen .Aegis span")[0].innerHTML = Math.floor(unitState.displayAegis);
       $("#unit-screen .Power span")[0].innerHTML = Math.floor(unitState.displayPower);

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
        
        dom.bind("#unit-screen button[name=back]", "click",
		  function () {
		      var exitGame = window.confirm(
              "Do you want to go to the game screen?"
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
    