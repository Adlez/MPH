
mph.screens["unit-screen"] = (function ()
{
   


    function gameLoop() {
        window.requestAnimationFrame(gameLoop, display.canvas);
        update();

    }



    function startGame() {
        gameState = 
        {
            Aegis: 0,
            Titav: 1,
            Velos: 2
        };


        var activeGame = storage.get("activeGameData"),
            useActiveGame;

        if (activeGame) {
            useActiveGame = window.confirm(
                "Do you want to continue your previous game?"
            );
            if (useActiveGame) {
                gameState.mcStoredFood = activeGame.mcStoredFood;
                gameState.mcStoredMaterial = activeGame.mcStoredMaterial;
            }
        }



        audio.initialize();
        if (useActiveGame) {
            //setLevelTimer(true, activeGame.time);
            updateGameInfo();
        }

        gameLoop();


    }

    var previousTime = Date.now();


    function update() {

        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();

        //addFood(10);
        //addMaterial(10);
        gameState.mcStoredFood += deltaTime;

        console.log(gameState.mcStoredFood);

        window.requestAnimationFrame(update);
        window.requestAnimationFrame(updateGameInfo);
    }

    UnitClass.init = function (Velos, Titav, Aegis) {
        this.Velos = POWER_V;
        this.Aegis = POWER_A;
        this.Titav = POWER_T;
    };

    UnitClass.CreateUnits = function () {
        //if() get when button is pressed to make a unit
        Units.push(Velos);
        //
        Units.push(Titav);
        //
        Units.push(Aegis);

    };

    UnitClass.RemoveUnits = function () {

        for (var index = 0; index < this.Units.length; index++) {
            if (Units[0] == POWER_V) {
                Units.slice(0);
            }
        }
    };
})();
    