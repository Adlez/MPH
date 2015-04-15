mph.screens["ship-screen"] = (function () {
    
	var display = mph.display,
    dom = mph.dom,
	$ = dom.$,
    firstRun = true
	

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

        displayShips();

        if (shipState.startTimer == true)
        {
            objShips.travelTime -= deltaTime;
            if(obj.travelTime <= 0)
            {
                //do whatever for arrival
                shipState.startTimer = false;
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

    };

    function checkIfCanAffordSupplyShips() {
        //if (objMainColony.mcStoredMaterial >= objShips.supplyShipBuildCost) {
            createSupplyShip();
            //objMainColony.mcStoredMaterial -= objShips.supplyShipBuildCost;
            //objShips.supplyShipDisplay += 1;
        //}
        //else {
           // ifCantAfford();

        //}
    };

    function createSupplyShip() {
        shipState.ships.push(objShips.supplyShip);
    };

    function ifCantAfford() {
        var tooPoor = window.confirm(
             "You can't afford this unit.....loser!");
    };

    function displayShips() {
        objShips.supplyShipDisplay = 0;
        objShips.shipPower = 0;
        for (var index = 0; index < shipState.ships.length; index++) {
            if (shipState.ships[index] == 1) {
                objShips.supplyShipDisplay += 1;
                objShips.shipPower += objShips.supplyShipPower;
            }
            
        }
    };

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
        $("#ship-screen .ShipPower span")[0].innerHTML = Math.floor(objShips.shipPower);
        $("#mainColony-screen .mainColonyStoredFood span")[0].innerHTML = Math.floor(objMainColony.mcStoredFood);
        $("#mainColony-screen .mainColonyStoredMat span")[0].innerHTML = Math.floor(objMainColony.mcStoredMaterial);
        $("#mainColony-screen .Farms span")[0].innerHTML = Math.floor(objMainColony.mcCurFarmCount);
        $("#mainColony-screen .Mines span")[0].innerHTML = Math.floor(objMainColony.mcCurMineCount);
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
