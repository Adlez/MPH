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
	//Main Colony Object
	var mainColony = {
		mcStoredFood: 0,
		mcStoredMaterial: 0,
		mcFoodProduction: 0,
		mcMaterialProduction: 0,
		mcStoredScience: 0,
		mcCurBuildingCount: 0,
		mcCurFarmCount: 0,
		mcCurMineCount: 0,
		//mcProduceFood: ProduceFood(){mainColony.mcStoredFood += mainColony.mcFoodProduction};
	};
	

	//constructor function for main colony, can duplicate this for every other colony
	function MainColony( storedFood, storedMaterial )
	{
		this.mcStoredFood = storedFood;
		this.mcStoredMaterial = storedMaterial;
	}

	function gameLoop()
	{
		window.requestAnimationFrame( gameLoop, display.canvas );


		update();

	}




	function startGame()
	{
		//Create Object


		gameState = {
			timer: 0, // setTimeout reference
			startTime: 0, // time at start of level
			endTime: 0 // time to game over
		};



		mainColony.mcCurFarmCount += 1;
		mainColony.mcCurMineCount += 1;

		var activeGame = storage.get( "activeGameData" ),
			    useActiveGame;


		if ( activeGame )
		{
			useActiveGame = window.confirm(
				    "Do you want to continue your previous game?"
				);
			if ( useActiveGame )
			{
				//	mainColony.mcStoredFood = activeGame.mcStoredFood;
				//	mainColony.mcStoredMaterial = activeGame.mcStoredMaterial;
			}
		}

		audio.initialize();
		if ( useActiveGame )
		{
			//setLevelTimer(true, activeGame.time);
			updateGameInfo();
		}


		gameLoop();

	}


	var previousTime = Date.now();

	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		mainColony.mcFoodProduction = mainColony.mcCurFarmCount;
		// both of these are incorrect amounts
		mainColony.mcMaterialProduction = mainColony.mcCurMineCount;

		//changeFood(10);
		//changeMaterial(10);
//		mainColony.mcStoredFood += ( mainColony.mcFoodProduction * 0.0001 );//slows down everything by a lot
//		mainColony.mcStoredMaterial += ( mainColony.mcMaterialProduction * 0.0001 );

		console.log( "Food: " + Math.floor( mainColony.mcStoredFood ) ); 
		console.log( "Material: " + Math.floor( mainColony.mcStoredMaterial ) ); 

		window.requestAnimationFrame( update );
		window.requestAnimationFrame( updateGameInfo );
	}


	function announce( str )
	{
		var element = $( "#game-screen .announcement" )[0];
		element.innerHTML = str;
		if ( Modernizr.cssanimations )
		{
			dom.removeClass( element, "zoomfade" );
			setTimeout( function ()
			{
				dom.addClass( element, "zoomfade" );
			}, 1 );
		} else
		{
			dom.addClass( element, "active" );
			setTimeout( function ()
			{
				dom.removeClass( element, "active" );
			}, 1000 );
		}
	}

	function updateGameInfo()
	{
		$( "#game-screen .mainColonyStoredFood span" )[0].innerHTML = Math.floor( mainColony.mcStoredFood );
		$( "#game-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( mainColony.mcStoredMaterial );

	}

	function changeFood( food )
	{
		mainColony.mcStoredFood += food;
	}
	function changeMaterial( material )
	{
		mainColony.mcStoredMaterial += material;
	}

	function gameOver()
	{
		audio.play( "gameover" );
		stopGame();
		storage.set( "activeGameData", null );
		display.gameOver( function ()
		{
			announce( "Game over" );
			setTimeout( function ()
			{
				mph.game.showScreen(
					    "hiscore", gameState.score );
			}, 2500 );
		} );
	}

	function run()
	{
		if ( firstRun )
		{
			setup();
			firstRun = false;
		}
		startGame();
		//gameLoop();
	}




	function stopGame()
	{

	}


	function saveGameData()
	{
		storage.set( "activeGameData", {
			level: gameState.level,
			score: gameState.score,
			time: Date.now() - gameState.startTime,
			mphs: board.getBoard()
		} );
	}


	function togglePause( enable )
	{
		if ( enable == paused ) return; // no change


		var overlay = $( "#game-screen .pause-overlay" )[0];
		paused = enable;
		overlay.style.display = paused ? "block" : "none";


		if ( paused )
		{

			pauseTime = Date.now();
		} else
		{

			;
		}
	}




	function setup()
	{
		input.initialize();


		dom.bind( "#game-screen button[name=exit]", "click",
			    function ()
			    {
			    	togglePause( true );
			    	var exitGame = window.confirm(
                    "Do you want to return to the main menu?"
                );
			    	togglePause( false );
			    	if ( exitGame )
			    	{
			    		saveGameData();
			    		stopGame();
			    		mph.game.showScreen( "main-menu" )
			    	}
			    }
			);
	}


	return {
		run: run
	};
} )();
