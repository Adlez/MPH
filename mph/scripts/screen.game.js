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
	currentlyBuilding = "",

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
			if ( buildingFarm )
			{
				objBuildings.buildingCurBuildTime++;
				currentlyBuilding = "Farm";
				//console.log( objBuildings.buildingFarmBuildTime );
				if ( objBuildings.buildingFarmBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingFarm = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "Farm", 2, 1 );
					objMainColony.mcConstructionInProgress = false;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Completed: " + currentlyBuilding;
				}
			}
			if ( buildingMine )
			{
				objBuildings.buildingCurBuildTime++;
				currentlyBuilding = "Mine";
				//console.log( objBuildings.buildingConstructionTime );
				if ( objBuildings.buildingMineBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingMine = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "Mine", 3, 2 );
					objMainColony.mcConstructionInProgress = false;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Completed: " + currentlyBuilding;
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
		$( "#game-screen .mainColonyStoredFood span" )[0].innerHTML = Math.floor( objMainColony.mcStoredFood ) + " + " + objMainColony.mcFoodProduction + " - " + objBuildings.buildingTotalFoodMaint;
		$( "#game-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( objMainColony.mcStoredMaterial ) + " + " + objMainColony.mcMaterialProduction + " - " + objBuildings.buildingTotalMatMaint;
		if ( objMainColony.mcConstructionInProgress )
		{
			$( "#mainColony-screen .BuildTimer span" )[0].innerHTML = "Time Progressed: " + objBuildings.buildingCurBuildTime;
		}
		else
		{ $( "#mainColony-screen .BuildTimer span" )[0].innerHTML = ""; }

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
		   });

		//////////Default ScreenSwapper Buttons/////////////////////////
		dom.bind( "#game-screen button[name=Army]", "click", //Army Screen
		  function ()
		  {
		  	mph.game.showScreen( "unit-screen" );
		  } );

		dom.bind( "#game-screen button[name=mainColonyScreen]", "click", //Main Colony Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );

		dom.bind( "#game-screen button[name=offWorldColonies]", "click", //Offworld Colonies Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#game-screen button[name=buildings]", "click", //Buildings Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#game-screen button[name=shipyard]", "click", //Shipyard Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );

		/////////Army ScreenSwapper Buttons///////////////////////////
		dom.bind( "#unit-screen button[name=Army]", "click", //Army Screen
		  function ()
		  {
		  	mph.game.showScreen( "unit-screen" );
		  } );

		dom.bind( "#unit-screen button[name=mainColonyScreen]", "click", //Main Colony Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );

		dom.bind( "#unit-screen button[name=offWorldColonies]", "click", //Offworld Colonies Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#unit-screen button[name=buildings]", "click", //Buildings Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#unit-screen button[name=shipyard]", "click", //Shipyard Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );



		//////////MainColony ScreenSwapper Buttons/////////////////////////
		dom.bind( "#mainColony-screen button[name=Army]", "click", //Army Screen
			function ()
			{
				mph.game.showScreen( "unit-screen" );
			} );

		dom.bind( "#mainColony-screen button[name=mainColonyScreen]", "click", //Main Colony Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );

		dom.bind( "#mainColony-screen button[name=offWorldColonies]", "click", //Offworld Colonies Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#mainColony-screen button[name=buildings]", "click", //Buildings Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#mainColony-screen button[name=shipyard]", "click", //Shipyard Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );



		////////////Main Colony Buildings Buttons///////////////////////
		dom.bind( "#mainColony-screen button[name=buildFarm]", "click",
		  function ()
		  {
		  	if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingFarmBuildCost <= objMainColony.mcStoredMaterial && objMainColony.mcCurBuildingCount + 1 < objMainColony.mcBuildingCap )
		  	{
		  		//(buildingName, buildCost, constructionTime, maintCost)
		  		buildingFarm = true;
		  		objMainColony.mcConstructionInProgress = true;
		  		objBuildings.buildingFarmBuildTime = 15;
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredMaterial -= objBuildings.buildingFarmBuildCost;

		  		$( "#game-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingFarmBuildCost;
		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingFarmBuildCost;
		  		$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Farm. ";
		  		//play audio
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
		  		}
		  		if ( objBuildings.buildingFarmBuildCost > objMainColony.mcStoredMaterial )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Farm";
		  		}
		  		if(objMainColony.mcCurBuildingCount + 1 > objMainColony.mcBuildingCap)
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
		  		}
		  		//display warning that construction is already in progress
		  	}
		  }
		  );

		dom.bind( "#mainColony-screen button[name=buildMine]", "click",
		  function ()
		  {
		  	if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingFarmBuildCost <= objMainColony.mcStoredMaterial && objMainColony.mcCurBuildingCount + 1 < objMainColony.mcBuildingCap )
		  	{
		  		//(buildingName, buildCost, constructionTime, maintCost)
		  		buildingMine = true;
		  		objMainColony.mcConstructionInProgress = true;
		  		objBuildings.buildingMineBuildTime = 15;
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredMaterial -= objBuildings.buildingMineBuildCost;

		  		$( "#game-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
		  		$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Mine. ";
		  		//play audio
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
		  		}
		  		if ( objBuildings.buildingFarmBuildCost >= objMainColony.mcStoredMaterial )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Mine";
		  		}
		  		if ( objMainColony.mcCurBuildingCount + 1 > objMainColony.mcBuildingCap )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
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
