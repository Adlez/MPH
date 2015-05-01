mph.screens["unit-screen"] = (function ()
{
    var storage = mph.storage,
	    display = mph.display,
        game = mph.game,
		dom = mph.dom,
	    $ = dom.$,
        firstRun = true,
	    paused = false,
        displayVelos = 0,
        displayTitav = 0,
        displayAegis = 0,
        displayPower = 0,
        attackTimer = false,
        startTimer = false,
        hippyDefeated = false,
        parasiteDefeated = false,
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
            Aegis: 50,
            Titav: 30,
            Velos: 20,
            finalPower: 0,
            unitRemove: 1,
            reset: 0,
            startTimer: false,
            arrived: false,
            victory: false,
            loser: false,
            gameOver: false,
            Units: []
        };

        gameLoop();
        setEnemyPower();
               
    }

    var previousTime = Date.now();


    function update() {

        deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        if (startTimer == true)
        {
            enemyColony.Distance -= deltaTime;
            if (enemyColony.Distance <= 0) {
                decideBattle();
                startTimer = false;
                enemyColony.Distance = unitState.reset;
            }
        }

        if (attackTimer == true)
        {
            enemyColony.attackDelay -= deltaTime;
            if(enemyColony.attackDelay <= 0)
            {
                decideRandBattle();
                attackTimer = false;
                isRuuning = false;
                enemyColony.attackDelay = unitState.reset;
            }
        }

        if (hippyDefeated == true)
        {
            enemyColony.enemyReset -= deltaTime;
            if(enemyColony.enemyReset <= 0)
            {
                hippyDefeated = false;
                whenResetEnemyPower();
                enemyColony.enemyReset = 10;
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
        if (objMainColony.mcStoredMaterial >= 50 && objBuildings.buildingMDIsBuilt == true){
            createVelos();
            objMainColony.mcStoredMaterial -= 50;
        }
        else {
            ifCantAfford();
           
        }
    };
    function checkIfCanAffordTitav()
    {
        if (objMainColony.mcStoredMaterial >= 250 && objBuildings.buildingMDIsBuilt == true)
        {
            createTitav();
            objMainColony.mcStoredMaterial -= 250;
        }
        else {
            ifCantAfford();
           
        }
    };
    function checkIfCanAffordAegis() {
        if (objMainColony.mcStoredMaterial >= 500 && objBuildings.buildingMDIsBuilt == true) {
            createAegis();
            objMainColony.mcStoredMaterial -= 500;
        }
        else {
            ifCantAfford();
           
        }
    };

    function createVelos() {
        unitState.Units.push(unitState.Velos);
        displayVelos += 1;
        displayPower += 20;
    };

    function createTitav() {
        unitState.Units.push(unitState.Titav);
        displayTitav += 1;
        displayPower += 30;
    };

    function createAegis() {
        unitState.Units.push(unitState.Aegis);
        displayAegis += 1;
        displayPower += 50;
    };

    function ifCantAfford()
    {
        var tooPoor = window.confirm(
             "You can't afford this unit.....loser or you need to build a Military Depot!");
    }

    function destroyUnitsLoss() {
        displayAegis -= displayAegis;
        displayVelos -= displayVelos;
        displayTitav -= displayTitav;
        displayPower -= displayPower;
        //unitState.Units.splice(0, unitState.Units.length);
    };

    function destroyUnitsWin()
    {
        displayAegis -= (displayAegis / 2);
        displayVelos -= (displayVelos / 2);
        displayTitav -= (displayTitav / 2);
        displayPower = ((displayAegis + displayTitav + displayVelos) * 10);
        //unitState.Units.splice(0, (unitState.Units.length / 2));
    }

    displayEnemyPower();

    function displayEnemyPower() {
        var viewButton =
            $("#unit-screen button[name=Display]")[0];
        dom.bind(viewButton, "click", function (e) {
            if (enemyColony.attackDelay <= 0 && displayPower >= 500) {
                enemyColony.setRandAttackDelay();
                attackTimer = true
            }
            
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
                if (enemyColony.Distance <= 0 && hippyDefeated == false) {
                    distanceTimer();
                    startTimer = true;
                }
            });

            var attack2Button =
                $("#unit-screen button[name=ParasiteHive]")[0];
            dom.bind(attack2Button, "click", function (e) {
                if (enemyColony.Distance <= 0) {
                    distanceTimer();
                    startTimer = true;
                }
            });
        
               
    }

    function distanceTimer()
    {
        enemyColony.setRandDistance();
    }

    function decideBattle() {
       
            unitState.finalPower = displayPower;
            unitState.finalPower -= enemyColony.Power;

            if (unitState.finalPower <= 0) {
                unitState.loser = true;
                destroyUnitsLoss();
                showLossResult();
            }
            else if (unitState.finalPower >= 0.1 && unitState.finalPower <= 499)
            {
                unitState.victory = true;
                hippyDefeated = true;
                enemyColony.Power = 0;
                enemyColony.ParaPower = 0;
                enemyColony.lowerShipPower1 = true;
                destroyUnitsWin();
                showWinResult();
            }
            else if(unitState.finalPower >= 500)
            {
                unitState.victory = true;
                hippyDefeated = true;
                enemyColony.Power = 0;
                enemyColony.ParaPower = 0;
                enemyColony.lowerShipPower1 = true;
                showWinResult();
            }
    }

    function whenResetEnemyPower() {
        if (enemyColony.enemyReset <= 0) {
            setEnemyPower();
        }
    }

    function decideRandBattle()
    {
        unitState.finalPower = displayPower;
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

    function enemyAttacks()
    {
        var enemyAttack = window.confirm(
             "An enemy is attacking you!");

    }

    function increaseDifficultyz()
    {
        if (enemyColony.difficultyIncrease >= 300 && enemyColony.difficultyIncrease <= 301)
        {
            enemyColony.setDifficultyChangeLvl1();
        }

        if (enemyColony.difficultyIncrease >= 600 && enemyColony.difficultyIncrease <= 601) {
            enemyColony.setDifficultyChangeLvl2();
        }
    }

    function updateGameInfo() {
       $("#unit-screen .Velos span")[0].innerHTML = Math.floor(displayVelos);
       $("#unit-screen .Titav span")[0].innerHTML = Math.floor(displayTitav);
       $("#unit-screen .Aegis span")[0].innerHTML = Math.floor(displayAegis);
       $("#unit-screen .Power span")[0].innerHTML = Math.floor(displayPower);
       $("#unit-screen .Timer span")[0].innerHTML = Math.floor(enemyColony.Distance);
       $("#unit-screen .EnemyPower span")[0].innerHTML = Math.floor(enemyColony.Power);
       $("#unit-screen .ParasitePower span")[0].innerHTML = Math.floor(enemyColony.ParaPower);
       $("#unit-screen .matCVReq span")[0].innerHTML = "Costs 100 Material";
       $("#unit-screen .matCTReq span")[0].innerHTML = "Costs 250 Material";
       $("#unit-screen .matCAReq span")[0].innerHTML = "Costs 500 Material";
       $("#unit-screen .mainColonyStoredMat span")[0].innerHTML = Math.floor(objMainColony.mcStoredMaterial);
       $("#unit-screen .mainColonyStoredFood span")[0].innerHTML = Math.floor(objMainColony.mcStoredFood);

        //$("#unit-screen .AttackDelay span")[0].innerHTML = Math.floor(enemyColony.attackDelay);
        //$("#unit-screen .MainMat2 span")[0].innerHTML = Math.floor(objMainColony.mcStoredMaterial);
        //$("#unit-screen .EnemyReset span")[0].innerHTML = Math.floor(enemyColony.enemyReset);
        //$("#unit-screen .Diff span")[0].innerHTML = Math.floor(enemyColony.difficultyIncrease);
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
        
       /* dom.bind("#unit-screen button[name=back]", "click",
		  function () {
		      var exitGame = window.confirm(
              "Do you want to go to the game screen?"
           );
		      
		      if (exitGame) {
		          
		          mph.game.showScreen("game-screen")
		      }
		  }
		);*/
    }

    return {
        run: run,        
    };

})();
    