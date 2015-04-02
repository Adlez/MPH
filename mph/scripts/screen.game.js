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

	var mcStoredFood = 0;
	var mcStroedMat = 0;

	function gameLoop()
	{
	//	context.fillRect( 0, 0, canvas.width, canvas.height );
	//	window.requestAnimationFrame( gameLoop, canvas );
		update();
		//	render();
		console.log( mcStoredFood );
	}

	//gameLoop();

	function render()
	{

	}

	function update()
	{
		addFood( 10 );
		addMaterial( 10 );

	}

	function startGame()
	{
		gameState = {
			mcStoredFood: 0,
			mcStoredMaterial: 0,
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

		mcStoredFood += 10;
		console.log( mcStoredFood );

		setLevelTimer( false );
		gameLoop();

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
		$( "#game-screen .mainColonyStoredFood span" )[0].innerHTML = gameState.mainColonyStoredFood;
		$( "#game-screen .mainColonyStoredMaterial span" )[0].innerHTML = gameState.mainColonyStoredMaterial;
	}


	function addFood( food )
	{
		gameState.mainColonyStoredFood += food;
		updateGameInfo();
	}
	function addMaterial( material )
	{
		gameState.mainColonyStoredMaterial += material;
		updateGameInfo();
	}


	function setLevelTimer( reset )
	{
		mcStoredFood += Date.now();
		console.log( mcStoredFood );
/*		if ( delta < 0 )
		{
			gameOver();
		} else
		{
			progress.style.width = percent + "%";
			gameState.timer = setTimeout( function ()
			{
				setLevelTimer( false );
			}, 30 );
		}*/
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
		clearTimeout( gameState.timer );
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
			clearTimeout( gameState.timer );
			gameState.timer = 0;
			pauseTime = Date.now();
		} else
		{
			gameState.startTime += Date.now() - pauseTime;
			setLevelTimer( false );
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

