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
	buildingMine = false,
	firstRun = true,
	paused = false,
	GameTimer = 0,

	mineMatCost = objBuildings.buildingMineBuildCost,

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

		objMainColony.mcLevel = 1;

		objMainColony.UpdateMainColony( objMainColony.mcFoodProduction, objMainColony.mcMaterialProduction, objMainColony.mcLevel, 0 );

		objMainColony.mcBuildBuilding( "Farm", 2, 1 );
		objMainColony.mcBuildBuilding( "Mine", 3, 2 );

		gameLoop();


	}

	var previousTime = Date.now();


	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		GameTimer += deltaTime;
		//console.log( "GameTimer: " + GameTimer );

		if ( GameTimer >= 1 )
		{
			objMainColony.mcFoodProduction = objMainColony.mcCurFarmCount * 15;
			// both of these are incorrect amounts for now
			objMainColony.mcMaterialProduction = objMainColony.mcCurMineCount * 20;

			objMainColony.UpdateMainColony( objMainColony.mcFoodProduction, objMainColony.mcMaterialProduction, objMainColony.mcLevel, 0 );
			objMainColony.EatMaintencance( objBuildings.buildingTotalFoodMaint, objBuildings.buildingTotalMatMaint );

			//Construction Stuff
			if ( objMainColony.mcConstructionInProgress )
			{
				console.log( "Time spent on Building so far: " + objBuildings.buildingCurBuildTime )
			}

			if ( buildingFarm )
			{
				objBuildings.buildingCurBuildTime++;
				//console.log( objBuildings.buildingFarmBuildTime );
				if ( objBuildings.buildingFarmBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingFarm = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "Farm", 2, 1 );
					objMainColony.mcConstructionInProgress = false;
				}
			}
			if ( buildingMine )
			{
				objBuildings.buildingCurBuildTime++;
				//console.log( objBuildings.buildingConstructionTime );
				if ( objBuildings.buildingMineBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingMine = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "Mine", 3, 2 );
					objMainColony.mcConstructionInProgress = false;
				}
			}
			GameTimer = 0;

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

		dom.bind( "#game-screen button[name=mainColonyScreen]", "click",
			function ()
			{
				togglePause( true );
				var exitGame = window.confirm(
				"View Main Colony?"
			 );
				togglePause( false );
				if ( exitGame )
				{
					//saveGameData();
					stopGame();
					mph.game.showScreen( "mainColony-screen" )
				}
			}
);

		dom.bind( "#mainColony-screen button[name=buildFarm]", "click",
		  function ()
		  {
		  	if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingFarmBuildCost <= objMainColony.mcStoredMaterial )
		  	{
		  		//(buildingName, buildCost, constructionTime, maintCost)
		  		buildingFarm = true;
		  		objMainColony.mcConstructionInProgress = true;
		  		objBuildings.buildingFarmBuildTime = 15;
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredFood -= objBuildings.buildingFarmBuildCost;

		  		$( "#game-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingFarmBuildCost;
		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingFarmBuildCost;
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			console.log( "Already building something" )
		  		}
		  		if ( objBuildings.buildingFarmBuildCost >= objMainColony.mcStoredMaterial )
		  		{
		  			console.log( "Not enough Material to build Farm" )
		  		}
		  		//display warning that construction is already in progress
		  	}
		  }
		  );

		dom.bind( "#mainColony-screen button[name=buildMine]", "click",
		  function ()
		  {
		  	if ( !objMainColony.mcConstructionInProgress && mineMatCost <= objMainColony.mcStoredMaterial )
		  	{
		  		//(buildingName, buildCost, constructionTime, maintCost)
		  		buildingMine = true;
		  		objMainColony.mcConstructionInProgress = true;
		  		objBuildings.buildingMineBuildTime = 15;
		  		objBuildings.buildingCurBuildTime = 0;
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			console.log( "Already building something" )
		  		}
		  		if ( objBuildings.buildingFarmBuildCost >= objMainColony.mcStoredMaterial )
		  		{
		  			console.log( "Not enough Material to build Mine" )
		  		}
		  	}
		  }
		  );
	}

	return {
		run: run,
		update: update

	};

} )();
