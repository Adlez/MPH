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
            displayPower: 0,
            finalPower: 0,
            unitRemove: 1,
            reset: 0,
            startTimer: false,
            attackTimer: false,
            arrived: false,
            victory: false,
            loser: false,
            gameOver: false,
            currFood: objMainColony.mcStoredFood,
            currMat: objMainColony.mcStoredMaterial,
            Units: [],
            isClicked: false
        };

        gameLoop();
        setEnemyPower();
               
    }

    var previousTime = Date.now();


    function update() {

        deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        totalPower();
        displayUnits();

        if (unitState.startTimer == true)
        {
            enemyColony.Distance -= deltaTime;
            if (enemyColony.Distance <= 0) {
                decideBattle();
                unitState.startTimer = false;
                enemyColony.Distance = reset;
            }
        }

        if (unitState.attackTimer == true)
        {
            enemyColony.attackDelay -= deltaTime;
            if(enemyColony.attackDelay <= 0)
            {
                decideRandBattle();
                unitState.attackTimer = false;
                enemyColony.attackDelay = reset;
            }
        }

        enemyColony.difficultyIncrease += deltaTime;
        increaseDifficultyz();
        
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

    createUnits();

    function createUnits () 
    {

        var CVButton =
            $("#unit-screen button[name=CreateVelos]")[0];
        dom.bind(CVButton, "click", function (e) {
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
        
    };

    function checkIfCanAffordVelos()
    {
        if (unitState.currMat >= 100) {
            createVelos();
            unitState.currMat -= 100;
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
            unitState.currMat -= 2500;
        }
        else {
            ifCantAfford();
        }
    };
    function checkIfCanAffordAegis() {
        if (unitState.currMat >= 500) {
            createAegis();
            unitState.currMat -= 500;
        }
        else {
            ifCantAfford();
        }
    };

    function createVelos() {
        unitState.Units.push(unitState.Velos);
    };

    function createTitav() {
        unitState.Units.push(unitState.Titav);
    };

    function createAegis() {
        unitState.Units.push(unitState.Aegis);
    };

    function ifCantAfford()
    {
        var tooPoor = window.confirm(
             "You can't afford this unit.....loser!");
    }

    function displayUnits() {
        unitState.displayVelos = 0;
        unitState.displayTitav = 0;
        unitState.displayAegis = 0;
        for (var index = 0; index < unitState.Units.length; index++)
        {
            if (unitState.Units[index] == 10) {
                unitState.displayVelos += (unitState.Units[index] / 10);
            }
            if (unitState.Units[index] == 20) {
                unitState.displayTitav += (unitState.Units[index] / 20);
            }
            if (unitState.Units[index] == 30) {
                unitState.displayAegis += (unitState.Units[index] / 30);
            }
        }
    };

    function destroyUnitsLoss() {

        unitState.Units.splice(0, unitState.Units.length);
    };

    function destroyUnitsWin()
    {
        unitState.Units.splice(0, (unitState.Units.length / 2));
    }

    function totalPower()
    {
        unitState.displayPower = (unitState.displayVelos * 10) + (unitState.displayTitav * 20) + (unitState.displayAegis * 30);
    }

    displayEnemyPower();

    function displayEnemyPower() {
        var viewButton =
            $("#unit-screen button[name=Display]")[0];
        dom.bind(viewButton, "click", function (e) {
        });
    }

    function setEnemyPower()
    {
        enemyColony.setRandPower();
        enemyColony.setRandParaPower();
    }

    Attack();

    function Attack()
    {
        var attack1Button =
            $("#unit-screen button[name=EnemyColony]")[0];
        dom.bind(attack1Button, "click", function (e) {
            distanceTimer();
            unitState.startTimer = true;
        });

        var attack2Button =
            $("#unit-screen button[name=ParasiteHive]")[0];
        dom.bind(attack2Button, "click", function (e) {
            distanceTimer();
            unitState.startTimer = true;
        });
        
    }

    function distanceTimer()
    {
        enemyColony.setRandDistance();
    }

    function decideBattle() {
       
            unitState.finalPower = unitState.displayPower;
            unitState.finalPower -= enemyColony.Power;

            if (unitState.finalPower <= 0) {
                unitState.loser = true;
                destroyUnitsLoss();
                showLossResult();
            }
            else if (unitState.finalPower >= 0.1 && unitState.finalPower <= 499)
            {
                unitState.victory = true;
                destroyUnitsWin();
                showWinResult();
            }
            else if(unitState.finalPower >= 500)
            {
                unitState.victory = true;
                showWinResult();
            }
    }

    function decideRandBattle()
    {
        unitState.finalPower = unitState.displayPower;
        enemyColony.setRandAttackerPower();
        unitState.finalPower -= enemyColony.randAttackerPower;

        if (unitState.finalPower <= 0) {
            unitState.gameOver = true;
            destroyUnitsLoss();
            showGameOverResult();
        }
        else if (unitState.finalPower >= 0.1 && unitState.finalPower <= 499) {
            unitState.victory = true;
            destroyUnitsWin();
            showWinResult();
        }
        else if (unitState.finalPower >= 500) {
            unitState.victory = true;
            showWinResult();
        }
    }

    function showWinResult()
    {
        if (unitState.victory == true) {
            var victoryW = window.confirm(
             "You are SUPER coolz! Oh and you defeated the enemy colony. Good job.");
        }
    }

    function showLossResult(){

        if (unitState.loser == true) {
            var loserW = window.confirm(
             "You lost, everyone is dead....good job?");
        }
    }

    function showGameOverResult()
    {
        if(unitState.gameOver == true)
        {
            var dead = window.confirm(
             "You dead Bitch!");
            //add more to end game
        }
    }

    setAttackTimer();

    function setAttackTimer()
    {
        enemyColony.setRandAttackDelay();
        unitState.attackTimer == true;
    }

    function enemyAttacks()
    {
        var enemyAttack = window.confirm(
             "An enemy is attacking you!");

    }

    function increaseDifficultyz()
    {
        if(enemyColony.attackTimer >= 300)
        {
            enemyColony.setDifficultyChangeLvl1();
        }

        if (enemyColony.attackTimer >= 600) {
            enemyColony.setDifficultyChangeLvl2();
        }
    }

    function updateGameInfo() {
       $("#unit-screen .Velos span")[0].innerHTML = Math.floor(unitState.displayVelos);
       $("#unit-screen .Titav span")[0].innerHTML = Math.floor(unitState.displayTitav);
       $("#unit-screen .Aegis span")[0].innerHTML = Math.floor(unitState.displayAegis);
       $("#unit-screen .Power span")[0].innerHTML = Math.floor(unitState.displayPower);
       $("#unit-screen .Timer span")[0].innerHTML = Math.floor(enemyColony.Distance);
       $("#unit-screen .EnemyPower span")[0].innerHTML = Math.floor(enemyColony.Power);
       $("#unit-screen .ParasitePower span")[0].innerHTML = Math.floor(enemyColony.ParaPower);

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
    