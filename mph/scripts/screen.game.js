mph.screens["game-screen"] = ( function ()
{
	var settings = mph.settings,
	    storage = mph.storage,
	    display = mph.display,
		board = mph.board,
	    input = mph.input,
	    dom = mph.dom,
	    audio = mph.audio,
	    $ = dom.$,
	    cursor,
	    firstRun = true,
	    paused = false,
	    pauseTime;

	
	function gameLoop() {
	    window.requestAnimationFrame(gameLoop, display.canvas);
	    
	    startGame();
	    update();
	   
	}

	

	    function startGame() {
	        gameState = {
	            mcStoredFood: 0,
	            mcStoredMaterial: 0,
	            timer: 0, // setTimeout reference
	            startTime: 0, // time at start of level
	            endTime: 0 // time to game over
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


	    }

	    var previousTime = Date.now();
	    

	    function update()
	    {
	        
	        var deltaTime = (Date.now() - previousTime) / 1000;
	        previousTime = Date.now();

	        //addFood(10);
	        //addMaterial(10);
	        gameState.mcStoredFood += 1;
	        console.log(gameState.mcStoredFood);

	        window.requestAnimationFrame(update);
	        window.requestAnimationFrame(updateGameInfo);
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
	        $("#game-screen .mainColonyStoredFood span")[0].innerHTML = gameState.mcStoredFood;
	        $("#game-screen .mainColonyStoredMat span")[0].innerHTML = gameState.mcStoredMaterial;

	        
	        
	    }


	    /*function addFood(food) {
	        gameState.mainColonyStoredFood += food;
	        updateGameInfo();
	    }
	    function addMaterial(material) {
	        gameState.mainColonyStoredMaterial += material;
	        updateGameInfo();
	    }*/


	    
	    function gameOver() {
	        audio.play("gameover");
	        stopGame();
	        storage.set("activeGameData", null);
	        display.gameOver(function () {
	            announce("Game over");
	            setTimeout(function () {
	                mph.game.showScreen(
                        "hiscore", gameState.score);
	            }, 2500);
	        });
	    }


	    function run() {
	        if (firstRun) {
	            setup();
	            firstRun = false;
	        }
	        gameLoop();
	    }


	    function stopGame() {
	       
	    }

	    function saveGameData() {
	        storage.set("activeGameData", {
	            level: gameState.level,
	            score: gameState.score,
	            time: Date.now() - gameState.startTime,
	            mphs: board.getBoard()
	        });
	    }

	    function togglePause(enable) {
	        if (enable == paused) return; // no change

	        var overlay = $("#game-screen .pause-overlay")[0];
	        paused = enable;
	        overlay.style.display = paused ? "block" : "none";

	        if (paused) {
	            
	            pauseTime = Date.now();
	        } else {
	            
	            ;
	        }
	    }


	    function setup() {
	        input.initialize();

	        dom.bind("#game-screen button[name=exit]", "click",
                function () {
                    togglePause(true);
                    var exitGame = window.confirm(
                    "Do you want to return to the main menu?"
                );
                    togglePause(false);
                    if (exitGame) {
                        saveGameData();
                        stopGame();
                        mph.game.showScreen("main-menu")
                    }
                }
            );
	    }

	    return {
	        run: run
	    };
	
} )();

