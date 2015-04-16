mph.screens["ship-screen"] = (function () {
    
	var display = mph.display,
    dom = mph.dom,
	$ = dom.$,
    firstRun = true,
    paused = false,
    pauseTime;
	

    function gameLoop() {
        window.requestAnimationFrame(gameLoop, display.canvas);
        update();

    }


    function startGame() {
        shipState = {
            startTimer: false,
            ships: []
        };

        gameLoop();


    }

    var previousTime = Date.now();


    function update() {

        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        //displayShips();

        if (shipState.startTimer == true)
        {
            objShips.travelTime -= deltaTime;
            if(objShips.travelTime <= 0)
            {
                //do whatever for arrival
                decideArrivelOutcome();

                shipState.startTimer = false;
                objShips.travelTime = 0;
            }
        }

        window.requestAnimationFrame(update);
        window.requestAnimationFrame(updateGameInfo);
    }

    createShips();

    function createShips() {

        var SSButton =
            $("#ship-screen button[name=CreateSupply]")[0];
        dom.bind(SSButton, "click", function (e) {
            checkIfCanAffordSupplyShips();
        });

        var SSButton =
            $("#ship-screen button[name=CreateEscort]")[0];
        dom.bind(SSButton, "click", function (e) {
            checkIfCanAffordEscortShips();
        });

        var SSButton =
            $("#ship-screen button[name=CreateColony]")[0];
        dom.bind(SSButton, "click", function (e) {
            checkIfCanAffordColonyShips();
        });

    };

    function checkIfCanAffordSupplyShips() {
        if (objMainColony.mcStoredMaterial >= objShips.supplyShipBuildCost) {
            createSupplyShip();
            objShips.supplyShipDisplay += 1;
            objShips.maxCargo += objShips.supplyShipCargoSpace;
            objShips.shipPower += objShips.supplyShipPower;
            objMainColony.mcStoredMaterial -= objShips.supplyShipBuildCost;
           
        }
        else {
            ifCantAfford();
        }
    };

    function createSupplyShip() {
        shipState.ships.push(objShips.supplyShip);
    };

    function checkIfCanAffordEscortShips() {
        if (objMainColony.mcStoredMaterial >= objShips.escortShipBuildCost) {
            createEscortShip();
            objShips.escortFighterDisplay += 1;
            objShips.shipPower += objShips.escortShipPower;
            objMainColony.mcStoredMaterial -= objShips.escortShipBuildCost;

        }
        else {
            ifCantAfford();

        }
    };

    function createEscortShip() {
        shipState.ships.push(objShips.escortFighter);
    };

    function checkIfCanAffordColonyShips() {
        if (objMainColony.mcStoredMaterial >= objShips.colonyShipBuildCost) {
            createColonyShip();
            objShips.colonyShipDisplay += 1;
            objShips.maxCargo += objShips.colonyShipCargoSpace;
            objShips.shipPower += objShips.colonyShipPower;
            objMainColony.mcStoredMaterial -= objShips.colonyShipBuildCost;

        }
        else {
            ifCantAfford();
        }
    };

    function createColonyShip() {
        shipState.ships.push(objShips.colonyShip);
    };

    function ifCantAfford() {
        var tooPoor = window.confirm(
             "You can't afford this unit.....loser!");
    };

    AddCargo();
    function AddCargo() {
        var ACButton =
           $("#ship-screen button[name=AddCargo]")[0];
        dom.bind(ACButton, "click", function (e) {
            if (objShips.currentCargo < objShips.maxCargo) {
                objMainColony.mcStoredMaterial -= 50;
                objShips.currentCargo += 50;
            }
            else {
                var noSpace = window.confirm(
             "No space left Sir!");
            }
        });
    }

    travelToNewColony();
    function travelToNewColony()
    {
        var FLButton =
          $("#ship-screen button[name=FTL]")[0];
        dom.bind(FLButton, "click", function (e) {
            if(objShips.colonyShipDisplay >= 1 && objShips.travelTime <= 0)
            {
                destroyShips();
                objShips.setRandTravelTime();
                objShips.setRandEnemyPower();
                shipState.startTimer = true;
            }
        });
    }

    function destroyShips()
    {
        objShips.supplyShipDisplay -= objShips.supplyShipDisplay;
        objShips.escortFighterDisplay -= objShips.escortFighterDisplay;
        objShips.colonyShipDisplay -= objShips.colonyShipDisplay;
        objShips.shipPower -= objShips.shipPower;
        objShips.maxCargo -= objShips.maxCargo;
    }

    function decideArrivelOutcome()
    {
        if(objShips.shipPower >= objShips.enemenemyShipPower)
        {
            Arrived();
        }
        else {
            var destroyed = window.confirm(
            "Your fleet was wiped out by the enemy! :(");
        }
    }

    function Arrived()
    {
        var arrived = window.confirm(
            "You have arrived at the planet!");
    }

    function announce(str) {
        var element = $("#game-screen .announcement")[0];
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


    function updateGameInfo() {
        $("#ship-screen .SupplyShips span")[0].innerHTML = Math.floor(objShips.supplyShipDisplay);
        $("#ship-screen .EscortShips span")[0].innerHTML = Math.floor(objShips.escortFighterDisplay);
        $("#ship-screen .ColonyShips span")[0].innerHTML = Math.floor(objShips.colonyShipDisplay);
        $("#ship-screen .ShipPower span")[0].innerHTML = Math.floor(objShips.shipPower);
        $("#ship-screen .MaxCargo span")[0].innerHTML = Math.floor(objShips.maxCargo);
        $("#ship-screen .CurrentCargo span")[0].innerHTML = Math.floor(objShips.currentCargo);
        $("#ship-screen .Travel span")[0].innerHTML = Math.floor(objShips.travelTime);
        $("#ship-screen .MainMat span")[0].innerHTML = Math.floor(objMainColony.mcStoredMaterial);
        $("#mainColony-screen .mainColonyStoredFood span")[0].innerHTML = Math.floor(objMainColony.mcStoredFood);
        $("#mainColony-screen .mainColonyStoredMat span")[0].innerHTML = Math.floor(objMainColony.mcStoredMaterial);
        $("#mainColony-screen .Farms span")[0].innerHTML = Math.floor(objMainColony.mcCurFarmCount);
        $("#mainColony-screen .Mines span")[0].innerHTML = Math.floor(objMainColony.mcCurMineCount);
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
        
    }

    return {
        run: run,
        update: update

    };

})();
