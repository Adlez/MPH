mph.screens["worlds-screen"] = ( function ()
{
	var display = mph.display,
	dom = mph.dom,
	$ = dom.$,
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
			
		};


		gameLoop();

	}

	var previousTime = Date.now();


	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		GameTimer += deltaTime;
		displayWorlds();
		

		window.requestAnimationFrame( update );
		window.requestAnimationFrame( updateGameInfo );
	}

	function displayWorlds()
	{
	    if (objShips.arrivedAtWorld == true) {
	        objWorlds.displayWorldName = "FuckADuck";
	        objWorlds.h_ColonyMaterialOutput += (deltaTime * 0.5);
	        objWorlds.h_ColonyFoodOutput += (deltaTime * 0.75);
	    }
	    /*for(index = 0; index < objWorlds.arrayOfWorlds.length; index++)
	    {
	        objWorlds.displayWorldName = objWorlds.arrayOfWorlds[index];
	    }*/
	}

	function recieveCargo()
	{
	    objWorlds.h_ColonyMaterialOutput += objShips.currentCargo;
	}

	sendCargo();
	function sendCargo()
	{
	    objWorlds.worldMatCargo += objWorlds.h_ColonyMaterialOutput;
	    objWorlds.worldFoodCargo += objWorlds.h_ColonyFoodOutput;

	    dom.bind("#worlds-screen button[name=SendCargo]", "click",
		  function () {
		      if (objShips.supplyShipDisplay >= 1) {
		          objWorlds.h_ColonyMaterialOutput = 0;
		          objWorlds.h_ColonyFoodOutput = 0;
		          objShips.supplyShipDisplay = 0;
		      }
		  });
	}


	function updateGameInfo()
	{
	    $("#worlds-screen .Level span")[0].innerHTML = "Level of Colony: " + objWorlds.h_WorldColonyLevel;
	    $("#worlds-screen .WName span")[0].innerHTML = objWorlds.displayWorldName;
	    $("#worlds-screen .SShips span")[0].innerHTML = Math.floor(objShips.supplyShipDisplay);
	    $("#worlds-screen .colonyStoredMat span")[0].innerHTML = Math.floor(objWorlds.h_ColonyMaterialOutput);
	    $("#worlds-screen .colonyStoredFood span")[0].innerHTML = Math.floor(objWorlds.h_ColonyFoodOutput);

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

	function setup()
	{
	   
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
