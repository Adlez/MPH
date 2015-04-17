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
		UpdateWorlds();
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

		window.requestAnimationFrame( update );
		window.requestAnimationFrame( updateGameInfo );

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
		          objMainCOlony.mcStoredFood += objWorlds.worldFoodCargo;
		          objMainColony.mcStoredMaterial += objWorlds.worldMatCargo;
		      }
		  });
	}

    function UpdateWorlds()
	{
		
		objWorlds.UpdateWorldsDisplays();

		//World 1
		$( "#worlds-screen .W1Name span" )[0].innerHTML = objWorlds.arrayOfWorlds[0].h_WorldID;
		$( "#worlds-screen .colony1Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.arrayOfWorlds[0].h_WorldColonyLevel;
		$( "#worlds-screen .colony1StoredFood span" )[0].innerHTML = "Food Stored: " + objWorlds.arrayOfWorlds[0].h_ColonyStoredFood + " +" + objWorlds.arrayOfWorlds[0].h_ColonyFoodOutput;
		$( "#worlds-screen .colony1StoredMat span" )[0].innerHTML = "Material Stored: " + objWorlds.arrayOfWorlds[0].h_ColonyStoredMat + " +" + objWorlds.arrayOfWorlds[0].h_ColonyMaterialOutput;
		$( "#worlds-screen .world1Fertility span" )[0].innerHTML = "Fertility: " + objWorlds.arrayOfWorlds[0].h_WorldFertilityLevel;
		$( "#worlds-screen .world1Mineral span" )[0].innerHTML = "Mineral Tier: " + objWorlds.arrayOfWorlds[0].h_WorldMineralLevel;

		//World 2
		$( "#worlds-screen .W2Name span" )[0].innerHTML = objWorlds.arrayOfWorlds[1].h_WorldID;
		$( "#worlds-screen .colony2Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.arrayOfWorlds[1].h_WorldColonyLevel;
		$( "#worlds-screen .colony2StoredFood span" )[0].innerHTML = "Food Stored: " + objWorlds.arrayOfWorlds[1].h_ColonyStoredFood + " +" + objWorlds.arrayOfWorlds[1].h_ColonyFoodOutput;
		$( "#worlds-screen .colony2StoredMat span" )[0].innerHTML = "Material Stored: " + objWorlds.arrayOfWorlds[1].h_ColonyStoredMat + " +" + objWorlds.arrayOfWorlds[1].h_ColonyMaterialOutput;
		$( "#worlds-screen .world2Fertility span" )[0].innerHTML = "Fertility: " + objWorlds.arrayOfWorlds[1].h_WorldFertilityLevel;
		$( "#worlds-screen .world2Mineral span" )[0].innerHTML = "Mineral Tier: " + objWorlds.arrayOfWorlds[1].h_WorldMineralLevel;


		//World 3
		$( "#worlds-screen .W3Name span" )[0].innerHTML = objWorlds.arrayOfWorlds[2].h_WorldID;
		$( "#worlds-screen .colony3Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.arrayOfWorlds[2].h_WorldColonyLevel;
		$( "#worlds-screen .colony3StoredFood span" )[0].innerHTML = "Food Stored: " + objWorlds.arrayOfWorlds[2].h_ColonyStoredFood + " +" + objWorlds.arrayOfWorlds[2].h_ColonyFoodOutput;
		$( "#worlds-screen .colony3StoredMat span" )[0].innerHTML = "Material Stored: " + objWorlds.arrayOfWorlds[2].h_ColonyStoredMat + " +" + objWorlds.arrayOfWorlds[2].h_ColonyMaterialOutput;
		$( "#worlds-screen .world3Fertility span" )[0].innerHTML = "Fertility: " + objWorlds.arrayOfWorlds[2].h_WorldFertilityLevel;
		$( "#worlds-screen .world3Mineral span" )[0].innerHTML = "Mineral Tier: " + objWorlds.arrayOfWorlds[2].h_WorldMineralLevel;

		

		

		

		

//		$( "#worlds-screen .SShips span" )[0].innerHTML = Math.floor( objWorlds.arrayOfWorlds[i].supplyShipDisplay );
//		$( "#worlds-screen .colonyStoredMat span" )[0].innerHTML = Math.floor( objWorlds.arrayOfWorlds[i].h_ColonyMaterialOutput );
//		$( "#worlds-screen .colonyStoredFood span" )[0].innerHTML = Math.floor( objWorlds.arrayOfWorlds[i].h_ColonyFoodOutput );
	}

	function updateGameInfo()
	{

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
		objWorlds.CreateWorld();
		objWorlds.CreateWorld();
		objWorlds.CreateWorld();

		dom.bind("#worlds-screen button[name=upgradeColony]", "click",
		  function () {
		      mph.screens["ship-screen"].travelToNewColony();
		      if (objShips.arrivedAtWorld == true) {
		          objWorlds.h_WorldColonyLevel++;
		      }
		      else {
		          var destroyed = window.confirm(
                    "Your fleet was wiped out by the enemy on route! :(");
		      }
		      console.log("Ouch Fucker");

		  });

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
		  				$( "#worlds-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to Upgrade";
		  			}
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
