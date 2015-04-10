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
	buildingFarm = false,
	firstRun = true,
	paused = false,
	pauseTime;
	//Main Colony Object


	function gameLoop()
	{
		window.requestAnimationFrame( gameLoop, display.canvas );
		update();

	}


	function startGame()
	{
		gameState = {
			timer: 0, // setTimeout reference
			startTime: 0, // time at start of level
			endTime: 0 // time to game over
		};

		//		var MainColony1 = MainColony( 500, 100 );

		//		objMainColony.mcCurFarmCount += 1;
		//		objMainColony.mcCurMineCount += 1;
		//		objMainColony.mcBuildingCap = 3;

		var activeGame = storage.get( "activeGameData" ),
		   useActiveGame;

		if ( activeGame )
		{
			useActiveGame = window.confirm(
			   "Do you want to continue your previous game?"
		    );
			if ( useActiveGame )
			{
				gameState.mcStoredFood = activeGame.mcStoredFood;
				gameState.mcStoredMaterial = activeGame.mcStoredMaterial;
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

	//BuildFarmButton isPressed ->
	//mph.screens.buildBuilding(Farm, 50, 0, 35)
	function buildBuilding( buildingName )//, matCost, sciCost, constructionSpeed )
	{

		if ( buildingName == "Farm" )
		{
			console.log( "Farm" );
		}
	}

	function buildButtonPressed( buildingName )
	{
		setTimeout( buildBuilding( buildingName ), objMainColony.mcConstructionTime )
	}

	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		//addFood(10);
		//addMaterial(10);
		//console.log(gameState.mcStoredFood);
		objMainColony.mcFoodProduction = objMainColony.mcCurFarmCount;
		// both of these are incorrect amounts for now
		//objMainColony.mcMaterialProduction = objMainColony.mcCurMineCount;

		objMainColony.mcStoredFood += ( objMainColony.mcFoodProduction * 0.0001 );//slows down everything by a lot
		//objMainColony.mcStoredMaterial += ( objMainColony.mcMaterialProduction * 0.0001 );

		//MainColonyLevel
		objMainColony.update();
//Construction Stuff
		if ( buildingFarm )
		{
			objBuildings.buildingConstructionTime++;
			console.log( objBuildings.buildingConstructionTime );
		}

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
		$( "#game-screen .mainColonyStoredFood span" )[0].innerHTML = Math.floor( objMainColony.mcStoredFood );
		$( "#game-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( objMainColony.mcStoredMaterial );



	}

	/*	function changeFood( food )
		{
			objMainColony.mcStoredFood += food;
		}
	
		function changeMaterial( material )
		{
			objMainColony.mcStoredMaterial += material;
		}
	
	
		function addFood( food )
		{
			gameState.mcStoredFood += food;
	
		}
		function addMaterial( material )
		{
			gameState.mcStoredMaterial += material;
	
		}
		*/


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
			//mphs: board.getBoard()
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
		   		//saveGameData();
		   		stopGame();
		   		mph.game.showScreen( "main-menu" )
		   	}
		   }


	    );

		dom.bind( "#game-screen button[name=Army]", "click",
		  function ()
		  {
		  	togglePause( true );
		  	var exitGame = window.confirm(
			"Do you want to go to the unit screen?"
		 );
		  	togglePause( false );
		  	if ( exitGame )
		  	{
		  		//saveGameData();
		  		stopGame();
		  		mph.game.showScreen( "unit-screen" )
		  	}
		  }
		);

		dom.bind( "#game-screen button[name=buildFarm]", "click",
		  function ()
		  {
		  	//(buildingName, buildCost, constructionTime, maintCost)
		  	buildingFarm = true;
		  	objBuildings.buildingConstructionTime = 35;
		  	objBuildings.buildingCurBuildTime = 0;		  	
		  }


		);
	}

	return {
		run: run

	};

} )();
