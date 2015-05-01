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
    deltaTime = 0,


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
		deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		GameTimer += deltaTime;

		updateResourcesOne();
		updateResourcesTwo();
		updateResourcesThree();
		winGame();
		//objWorlds.UpdateOffWorldColony();

		window.requestAnimationFrame( update );
		window.requestAnimationFrame( updateGameInfo );

	}

	function updateResourcesOne()
	{
	    if (objWorlds.updateOne == true) {
	        objWorlds.arrayOfWorlds[0].h_ColonyStoredFood += (objWorlds.arrayOfWorlds[0].h_WorldFertilityLevel * deltaTime);
	        objWorlds.arrayOfWorlds[0].h_ColonyStoredMat += (objWorlds.arrayOfWorlds[0].h_WorldMineralLevel * deltaTime);
	    }
	}

	function updateResourcesTwo()
	{
	    if (objWorlds.updateTwo == true) {
	        objWorlds.arrayOfWorlds[1].h_ColonyStoredFood += (objWorlds.arrayOfWorlds[1].h_WorldFertilityLevel * deltaTime);
	        objWorlds.arrayOfWorlds[1].h_ColonyStoredMat += (objWorlds.arrayOfWorlds[1].h_WorldMineralLevel * deltaTime);
	    }
	}

	function updateResourcesThree()
	{
	    if (objWorlds.updateThree == true) {
	        objWorlds.arrayOfWorlds[2].h_ColonyStoredFood += (objWorlds.arrayOfWorlds[2].h_WorldFertilityLevel * deltaTime);
	        objWorlds.arrayOfWorlds[2].h_ColonyStoredMat += (objWorlds.arrayOfWorlds[2].h_WorldMineralLevel * deltaTime);
	    }
	}

	function recieveCargo()
	{
	    objWorlds.arrayOfWorlds[0].h_ColonyStoredMat += objShips.currentCargo;
	}

	sendCargo();
	function sendCargo()
	{
	    dom.bind("#worlds-screen button[name=SendCargo]", "click",
		  function () {
		      console.log("Sharf! :/");
		      if (objShips.supplyShipDisplay >= 1) {

		          for (index = 0; index < objWorlds.arrayOfWorlds.length; index++) {
		              objWorlds.homeWorldMat += objWorlds.arrayOfWorlds[index].h_ColonyStoredMat;
		              objWorlds.homeWorldFood += objWorlds.arrayOfWorlds[index].h_ColonyStoredFood;
		              objWorlds.arrayOfWorlds[index].h_ColonyStoredFood = 0;
		              objWorlds.arrayOfWorlds[index].h_ColonyStoredMat = 0;    
		          }
		          objShips.supplyShipDisplay = 0;
		          objShips.shipPower = 0;
		          objShips.foodMaintCost = 0;
		          objShips.maxCargo = 0;
		         
		      }
		  });
	}

	function winGame()
	{
	    if(objWorlds.homeWorldFood == 15000 && objWorlds.homeWorldMat == 10000)
	    {
	        var winSauce = window.confirm(
                "You have ensured the home world's survival for now.........");
	        mph.game.showScreen("main-menu");
  	    }
	}

    function UpdateWorlds()
	{
		
		objWorlds.UpdateWorldsDisplays();
		$("#worlds-screen .TravelTime span")[0].innerHTML = Math.floor(objShips.travelTime);
		$("#worlds-screen .SShips span")[0].innerHTML = objShips.supplyShipDisplay;
		$("#worlds-screen .CShips span")[0].innerHTML = objShips.colonyShipDisplay;
		//World 1
		$( "#worlds-screen .W1Name span" )[0].innerHTML = objWorlds.arrayOfWorlds[0].h_WorldID;
		$( "#worlds-screen .colony1Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.arrayOfWorlds[0].h_WorldColonyLevel;
		$( "#worlds-screen .colony1StoredFood span" )[0].innerHTML = "Food Stored: " + Math.floor(objWorlds.arrayOfWorlds[0].h_ColonyStoredFood) + " +" + Math.floor(objWorlds.arrayOfWorlds[0].h_ColonyFoodOutput);
		$( "#worlds-screen .colony1StoredMat span" )[0].innerHTML = "Material Stored: " + Math.floor(objWorlds.arrayOfWorlds[0].h_ColonyStoredMat) + " +" + Math.floor(objWorlds.arrayOfWorlds[0].h_ColonyMaterialOutput);
		$( "#worlds-screen .world1Fertility span" )[0].innerHTML = "Fertility: " + Math.floor(objWorlds.arrayOfWorlds[0].h_WorldFertilityLevel);
		$( "#worlds-screen .world1Mineral span" )[0].innerHTML = "Mineral Tier: " + Math.floor(objWorlds.arrayOfWorlds[0].h_WorldMineralLevel);

		//World 2
		$( "#worlds-screen .W2Name span" )[0].innerHTML = objWorlds.arrayOfWorlds[1].h_WorldID;
		$( "#worlds-screen .colony2Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.arrayOfWorlds[1].h_WorldColonyLevel;
		$( "#worlds-screen .colony2StoredFood span" )[0].innerHTML = "Food Stored: " + Math.floor(objWorlds.arrayOfWorlds[1].h_ColonyStoredFood) + " +" + Math.floor(objWorlds.arrayOfWorlds[1].h_ColonyFoodOutput);
		$( "#worlds-screen .colony2StoredMat span" )[0].innerHTML = "Material Stored: " + Math.floor(objWorlds.arrayOfWorlds[1].h_ColonyStoredMat) + " +" + Math.floor(objWorlds.arrayOfWorlds[1].h_ColonyMaterialOutput);
		$( "#worlds-screen .world2Fertility span" )[0].innerHTML = "Fertility: " + Math.floor(objWorlds.arrayOfWorlds[1].h_WorldFertilityLevel);
		$( "#worlds-screen .world2Mineral span" )[0].innerHTML = "Mineral Tier: " + Math.floor(objWorlds.arrayOfWorlds[1].h_WorldMineralLevel);

		//World 3
		$( "#worlds-screen .W3Name span" )[0].innerHTML = objWorlds.arrayOfWorlds[2].h_WorldID;
		$( "#worlds-screen .colony3Level span" )[0].innerHTML = "Level of Colony: " + objWorlds.arrayOfWorlds[2].h_WorldColonyLevel;
		$( "#worlds-screen .colony3StoredFood span" )[0].innerHTML = "Food Stored: " + Math.floor(objWorlds.arrayOfWorlds[2].h_ColonyStoredFood) + " +" + Math.floor(objWorlds.arrayOfWorlds[2].h_ColonyFoodOutput);
		$( "#worlds-screen .colony3StoredMat span" )[0].innerHTML = "Material Stored: " + Math.floor(objWorlds.arrayOfWorlds[2].h_ColonyStoredMat) + " +" + Math.floor(objWorlds.arrayOfWorlds[2].h_ColonyMaterialOutput);
		$( "#worlds-screen .world3Fertility span" )[0].innerHTML = "Fertility: " + Math.floor(objWorlds.arrayOfWorlds[2].h_WorldFertilityLevel);
		$("#worlds-screen .world3Mineral span")[0].innerHTML = "Mineral Tier: " + Math.floor(objWorlds.arrayOfWorlds[2].h_WorldMineralLevel);

		$("#worlds-screen .mainColonyStoredMat span")[0].innerHTML = Math.floor(objMainColony.mcStoredMaterial);
		$("#worlds-screen .mainColonyStoredFood span")[0].innerHTML = Math.floor(objMainColony.mcStoredFood);
		$("#worlds-screen .mainColonyStoredScience span")[0].innerHTML = Math.floor(objMainColony.mcStoredScience);

		$("#worlds-screen .homeWorldFood span")[0].innerHTML = Math.floor(objWorlds.homeWorldFood);
		$("#worlds-screen .homeWorldMat span")[0].innerHTML = Math.floor(objWorlds.homeWorldMat);

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
	    for (index = 0; index < 3; index++) {
	        objWorlds.CreateWorld();
	    }
		//objWorlds.CreateWorld();
		//objWorlds.CreateWorld();

		
		////////////World Colony  Buttons///////////////////////
		///////Level Up the Colony
		dom.bind("#worlds-screen button[name=upgradeColony]", "click",
		  function () {
		      console.log("FART");
		      mph.screens["ship-screen"].travelToNewColony();
		      if (objWorlds.isSettled1 == false) {
		          objWorlds.isSettled1 = true;
		      }
		  });

		dom.bind("#worlds-screen button[name=upgradeColony2]", "click",
		  function () {
		      console.log("FART2");
		      mph.screens["ship-screen"].travelToNewColony();
		      if (objWorlds.isSettled2 == false) {
		          objWorlds.isSettled2 = true;
		      }
		  });

		dom.bind("#worlds-screen button[name=upgradeColony3]", "click",
		  function () {
		      console.log("FART3");
		      mph.screens["ship-screen"].travelToNewColony();
		      if (objWorlds.isSettled3 == false) {
		          objWorlds.isSettled3 = true;
		      }
		  });	
	}

	return {
		run: run,
		update: update,
		recieveCargo: recieveCargo,
		updateResourcesOne: updateResourcesOne,
		updateResourcesTwo: updateResourcesTwo,
		updateResourcesThree: updateResourcesThree

	};

} )();
