mph.screens["mainColony-screen"] = ( function ()
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

		audio.initialize();

		gameLoop();


	}

	var previousTime = Date.now();


	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

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
		$( "#mainColony-screen .mainColonyStoredFood span" )[0].innerHTML = Math.floor( objMainColony.mcStoredFood );
		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( objMainColony.mcStoredMaterial );
		$( "#mainColony-screen .Farms span" )[0].innerHTML = Math.floor( objMainColony.mcCurFarmCount );
		$("#mainColony-screen .Mines span")[0].innerHTML = Math.floor(objMainColony.mcCurMineCount);
		//$("#unit-screen .Velos span")[0].innerHTML = Math.floor(displayVelos);
		//$("#unit-screen .Titav span")[0].innerHTML = Math.floor(unitState.displayTitav);
		//$("#unit-screen .Aegis span")[0].innerHTML = Math.floor(unitState.displayAegis);
		//$("#unit-screen .Power span")[0].innerHTML = Math.floor(unitState.displayPower);
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
	}

	return {
		run: run,
		update: update

	};

} )();
