mph.screens["worlds-screen"] = ( function ()
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

	buildingFarm = false,
	buildingMine = false,
	buildingRF = false,
	buildingSpaceEl = false,
	buildingConPlat = false,
	paused = false,
	firstLoop = false,
	GameTimer = 0,


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


		gameLoop();

	}

	var previousTime = Date.now();


	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		GameTimer += deltaTime;

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
		$( "#worlds-screen .Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.h_WorldColonyLevel;

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
			objWorlds.CreateWorld();
			objWorlds.CreateWorld();
			objWorlds.CreateWorld();
			objWorlds.CreateWorld();
			objWorlds.CreateWorld();

			setup();

			firstRun = false;
		}
		startGame();
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

		
		////////////World Colony  Buttons///////////////////////
		///////Level Up the Colony
		dom.bind( "#worlds-screen button[name=upgradeColony]", "click",
		  function ()
		  {
		  	if ( objWorlds.mcLevel < 100 )
		  	{
		  		if ( objWorlds.h_WorldColonyLevelUpCostMat <= objWorlds.mcStoredMaterial )
		  		{

		  			objWorlds.h_WorldColonyLevel++;
		  			objWorlds.mcStoredMaterial -= objWorlds.h_WorldColonyLevelUpCostMat;

	//	  			$( "#worlds-screen .colonyStoredMat span" )[0].innerHTML = + " + " + Math.floor( objWorlds.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
	//	  			$( "#worlds-screen .colonyStoredMat span" )[0].innerHTML = + " + " + Math.floor( objWorlds.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
	//	  			$( "#worlds-screen .screenFeedBack span" )[0].innerHTML = "Colony Upgraded. ";
		  			//play audio
		  		}
		  		else
		  		{
		  			if ( objWorlds.h_WorldColonyLevelUpCostMat > objWorlds.mcStoredMaterial )
		  			{
//		  				$( "#worlds-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to Upgrade";
		  			}
		  			else{}
//		  			{ $( "#worlds-screen .screenFeedBack span" )[0].innerHTML = "Need more Material and Science to Upgrade"; }

		  		}
		  	}
		  	else
		  	{
//		  		$( "#worlds-screen .screenFeedBack span" )[0].innerHTML = "Colony cannot be upgraded further.";
		  	}

		  }
		  );
	}

	return {
		run: run,
		update: update

	};

} )();
