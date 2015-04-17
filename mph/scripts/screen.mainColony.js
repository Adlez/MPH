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

	buildingFarm = false,
	buildingMine = false,
	buildingRF = false,
	buildingSpaceEl = false,
	buildingConPlat = false,
	buildingMD = false,

	paused = false,
	firstLoop = false,
	GameTimer = 0,
	currentlyBuilding = "",
	Atyne = 0,

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


		gameLoop();

	}

	var previousTime = Date.now();


	function update()
	{

		var deltaTime = ( Date.now() - previousTime ) / 1000;
		previousTime = Date.now();

		GameTimer += deltaTime;

		var Level_Max = 100;
		var Level_Min = 1;

		for ( var i = 0; i < objMainColony.mcLevel; ++i )
		{
			Atyne = ( ( ( objMainColony.mcLevel - Level_Min ) + 5 ) / Level_Max ) * ( ( ( objMainColony.mcLevel - Level_Min ) + 5 ) / Level_Max );
			Atyne *= 500;

		}

		objMainColony.mcLevelUpCostMat = (objMainColony.mcLevel * 226)* Atyne;
		objMainColony.mcLevelUpCostSci = (objMainColony.mcLevel * 112) * Atyne;


		if ( GameTimer >= 1 )
		{
			objMainColony.mcFoodProduction = objMainColony.mcCurFarmCount * 15;
			objMainColony.mcMaterialProduction = objMainColony.mcCurMineCount * 20;
			objMainColony.mcScienceProduction = (objMainColony.mcCurRFCount * 2) + (objMainColony.mcLevel * 0.5);

			objMainColony.UpdateMainColony( objMainColony.mcFoodProduction, objMainColony.mcMaterialProduction, objMainColony.mcLevel, objMainColony.mcScienceProduction );
			objMainColony.EatMaintencance( objBuildings.buildingTotalFoodMaint, objBuildings.buildingTotalMatMaint );

			//			objWorlds.up
			objWorlds.UpdateWorlds();
//			objWorlds.UpdateOffWorldColony();

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
			if ( buildingRF )
			{
				objBuildings.buildingCurBuildTime++;
				currentlyBuilding = "Lab";
				//console.log( objBuildings.buildingConstructionTime );
				if ( objBuildings.buildingRFBuildTime >= 0 )
				{
					console.log( "It's defined." );
				}
				if ( objBuildings.buildingRFBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingRF = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "Lab", 7, 3 );
					objMainColony.mcConstructionInProgress = false;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Completed: " + currentlyBuilding;
				}
			}
			if ( buildingSpaceEl )
			{
				objBuildings.buildingCurBuildTime++;
				currentlyBuilding = "Space Elevator";
				//console.log( objBuildings.buildingConstructionTime );
				if ( objBuildings.buildingSpaceElBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingSpaceEl = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding("SpaceElevator", 10, 0);
					objMainColony.mcConstructionInProgress = false;
					objBuildings.buildingSpaceElIsBuilt = true;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Completed: " + currentlyBuilding;
				}
			}
			if ( buildingMD )
			{
				objBuildings.buildingCurBuildTime++;
				currentlyBuilding = "Military Depot";
				//console.log( objBuildings.buildingConstructionTime );
				if ( objBuildings.buildingMDBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingMD = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "MilitaryDepot", 2, 4 );
					objMainColony.mcConstructionInProgress = false;
					objBuildings.buildingMDIsBuilt = true;
					
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Completed: " + currentlyBuilding;
				}
			}
			if ( buildingConPlat )
			{
				objBuildings.buildingCurBuildTime++;
				currentlyBuilding = "Construction Platform";
				//console.log( objBuildings.buildingConstructionTime );
				if ( objBuildings.buildingConPlatBuildTime <= objBuildings.buildingCurBuildTime )
				{
					buildingConPlat = false;
					objBuildings.buildingCurBuildTime = 0;
					//(buildingName, buildCost, maintCost)
					objMainColony.mcBuildBuilding( "ConstructionPlatform", 7, 3 );
					objMainColony.mcConstructionInProgress = false;
					objBuildings.buildingConPlatIsBuilt = true;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Completed: " + currentlyBuilding;
				}
			}
			GameTimer = 0;

		}

		

		window.requestAnimationFrame( update );
		window.requestAnimationFrame( updateGameInfo );
	}

    

	
	function DestroyBUildings()
	{
	       
	   
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
		$( "#mainColony-screen .mainColonyStoredFood span" )[0].innerHTML = Math.floor( objMainColony.mcStoredFood ) + " + " + objMainColony.mcFoodProduction + " - " + objBuildings.buildingTotalFoodMaint;
		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = Math.floor( objMainColony.mcStoredMaterial ) + " + " + objMainColony.mcMaterialProduction + " - " + objBuildings.buildingTotalMatMaint;

		$( "#mainColony-screen .mainColonyStoredFood span" )[0].innerHTML += " - " + objBuildings.buildingTotalFoodMaint;
		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML += " - " + objBuildings.buildingTotalMatMaint;

		$( "#mainColony-screen .Farms span" )[0].innerHTML = objMainColony.mcCurFarmCount;
		$("#mainColony-screen .Mines span")[0].innerHTML = objMainColony.mcCurMineCount;
		$("#mainColony-screen .Labs span")[0].innerHTML = objMainColony.mcCurRFCount;

		$( "#mainColony-screen .Level span" )[0].innerHTML = objMainColony.mcLevel;
		$( "#mainColony-screen .sciUpgradeReq span" )[0].innerHTML = Math.floor(objMainColony.mcLevelUpCostSci)  + " Science Needed";
		$( "#mainColony-screen .matUpgradeReq span" )[0].innerHTML = Math.floor( objMainColony.mcLevelUpCostMat ) + " Material Cost";


		$( "#mainColony-screen .matFarmReq span" )[0].innerHTML = objBuildings.buildingFarmBuildCost + " Material Cost";
		$( "#mainColony-screen .matMineReq span" )[0].innerHTML = objBuildings.buildingMineBuildCost + " Material Cost";
		$( "#mainColony-screen .matRFReq span" )[0].innerHTML = objBuildings.buildingRFBuildCost + " Material Cost";
		$( "#mainColony-screen .matSpaceElReq span" )[0].innerHTML = objBuildings.buildingSpaceElBuildCost + " Material Cost";
		$( "#mainColony-screen .matConPlatReq span" )[0].innerHTML = objBuildings.buildingConPlatBuildCost + " Material Cost";
		$( "#mainColony-screen .matMDReq span" )[0].innerHTML = objBuildings.buildingMDBuildCost + " Material Cost";

		$( "#mainColony-screen .BuildingCap span" )[0].innerHTML = +objMainColony.mcCurBuildingCount + "/" + Math.floor( objMainColony.mcBuildingCap );




		$( "#mainColony-screen .mainColonyStoredScience span" )[0].innerHTML = Math.floor( objMainColony.mcStoredScience ) + " + " + objMainColony.mcScienceProduction;
		if ( objMainColony.mcConstructionInProgress )
		{
			$( "#mainColony-screen .BuildTimer span" )[0].innerHTML = "Time Progressed: " + objBuildings.buildingCurBuildTime;
		}
		else
		{ $( "#mainColony-screen .BuildTimer span" )[0].innerHTML = ""; }


		//$("#unit-screen .Velos span")[0].innerHTML = Math.floor(displayVelos);
		//$("#unit-screen .Titav span")[0].innerHTML = Math.floor(unitState.displayTitav);
		//$("#unit-screen .Aegis span")[0].innerHTML = Math.floor(unitState.displayAegis);
		//$("#unit-screen .Power span")[0].innerHTML = Math.floor(unitState.displayPower);
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
			objMainColony.mcLevel = 1;
			objMainColony.UpdateMainColony( objMainColony.mcFoodProduction, objMainColony.mcMaterialProduction, objMainColony.mcLevel, 0 );
			objMainColony.mcBuildBuilding( "Farm", 2, 1 );
			objMainColony.mcBuildBuilding( "Mine", 3, 2 );
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
				mph.game.showScreen( "ship-screen" );
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
				mph.game.showScreen( "worlds-screen" );
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
				mph.game.showScreen( "ship-screen" );
			} );

		//////////shipScreen ScreenSwapper Buttons/////////////////////////
		dom.bind( "#ship-screen button[name=Army]", "click", //Army Screen
			function ()
			{
				mph.game.showScreen( "unit-screen" );
			} );

		dom.bind( "#ship-screen button[name=mainColonyScreen]", "click", //Main Colony Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );

		dom.bind( "#ship-screen button[name=offWorldColonies]", "click", //Offworld Colonies Screen
			function ()
			{
				mph.game.showScreen( "worlds-screen" );
			}
			);
		dom.bind( "#ship-screen button[name=buildings]", "click", //Buildings Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#ship-screen button[name=shipyard]", "click", //Shipyard Screen
			function ()
			{
				mph.game.showScreen( "ship-screen" );
			} );

		//////////world ScreenSwapper Buttons/////////////////////////
		dom.bind( "#worlds-screen button[name=Army]", "click", //Army Screen
			function ()
			{
				mph.game.showScreen( "unit-screen" );
			} );

		dom.bind( "#worlds-screen button[name=mainColonyScreen]", "click", //Main Colony Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			} );

		dom.bind( "#worlds-screen button[name=offWorldColonies]", "click", //Offworld Colonies Screen
			function ()
			{
				mph.game.showScreen( "worlds-screen" );
			}
			);
		dom.bind( "#worlds-screen button[name=buildings]", "click", //Buildings Screen
			function ()
			{
				mph.game.showScreen( "mainColony-screen" );
			}
			);
		dom.bind( "#worlds-screen button[name=shipyard]", "click", //Shipyard Screen
			function ()
			{
				mph.game.showScreen( "ship-screen" );
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
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredMaterial -= objBuildings.buildingFarmBuildCost;

		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingFarmBuildCost;
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
		  		else if ( objMainColony.mcCurBuildingCount + 1 > objMainColony.mcBuildingCap )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
		  		}
		  		else if ( objBuildings.buildingFarmBuildCost > objMainColony.mcStoredMaterial )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Farm";
		  		}
		  		else
		  		{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Something Aweful Has Happened. Sorry, we'll try and fix that."; }
		  		
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
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredMaterial -= objBuildings.buildingMineBuildCost;

		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = + " + " + Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = + " + " + Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
		  		$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Mine. ";
		  		//play audio
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
		  		}
		  		else if ( objMainColony.mcCurBuildingCount + 1 > objMainColony.mcBuildingCap )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
		  		}
		  		else if ( objBuildings.buildingFarmBuildCost >= objMainColony.mcStoredMaterial )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Mine";
		  		}
		  		else
		  		{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Something Aweful Has Happened. Sorry, we'll try and fix that."; }
		  	}
		  }
		  );

		dom.bind( "#mainColony-screen button[name=buildRF]", "click",
		  function ()
		  {
		  	if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingRFBuildCost <= objMainColony.mcStoredMaterial && objMainColony.mcCurBuildingCount + 1 < objMainColony.mcBuildingCap )
		  	{
		  		//(buildingName, buildCost, constructionTime, maintCost)
		  		buildingRF = true;
		  		objMainColony.mcConstructionInProgress = true;
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredMaterial -= objBuildings.buildingRFBuildCost;

		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingRFBuildCost;
		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingRFBuildCost;
		  		$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Lab. ";
		  		//play audio
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
		  		}
		  		else if ( objMainColony.mcCurBuildingCount + 1 > objMainColony.mcBuildingCap )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
		  		}
		  		else if ( objBuildings.buildingRFBuildCost > objMainColony.mcStoredMaterial )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build a Lab";
		  		}
		  		else
		  		{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Something Aweful Has Happened. Sorry, we'll try and fix that."; }
		  		//display warning that construction is already in progress
		  	}
		  }
		  );

		dom.bind( "#mainColony-screen button[name=buildSpaceEl]", "click",
		  function ()
		  {
		  	if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingSpaceElBuildCost <= objMainColony.mcStoredMaterial && objMainColony.mcCurBuildingCount + 2 < objMainColony.mcBuildingCap )
		  	{
		  		//(buildingName, buildCost, constructionTime, maintCost)
		  		buildingSpaceEl = true;
		  		objMainColony.mcConstructionInProgress = true;
		  		objBuildings.buildingCurBuildTime = 0;

		  		objMainColony.mcStoredMaterial -= objBuildings.buildingSpaceElBuildCost;

		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingSpaceElBuildCost;
		  		$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingSpaceElBuildCost;
		  		$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Space Elevator";
		  		//play audio
		  	}
		  	else
		  	{
		  		if ( objMainColony.mcConstructionInProgress )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
		  		}
		  		else if ( objMainColony.mcCurBuildingCount + 2 > objMainColony.mcBuildingCap )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
		  		}
		  		else if ( objBuildings.buildingSpaceElBuildCost > objMainColony.mcStoredMaterial )
		  		{
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Space Elevator";
		  		}
		  		else
		  		{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Something Aweful Has Happened. Sorry, we'll try and fix that."; }
		  		//display warning that construction is already in progress
		  	}
		  }
		  );

		dom.bind( "#mainColony-screen button[name=buildConPlat]", "click",
			function ()
			{
				if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingConPlatBuildCost <= objMainColony.mcStoredMaterial && objMainColony.mcCurBuildingCount + 2 < objMainColony.mcBuildingCap )
				{
					//(buildingName, buildCost, constructionTime, maintCost)
					buildingConPlat = true;
					objMainColony.mcConstructionInProgress = true;
					objBuildings.buildingCurBuildTime = 0;

					objMainColony.mcStoredMaterial -= objBuildings.buildingConPlatBuildCost;
					$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingConPlatBuildCost;
					$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingConPlatBuildCost;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Space Elevator";
					//play audio
				}
				else
				{
					if ( objMainColony.mcConstructionInProgress )
					{
						$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
					}
					else if ( objMainColony.mcCurBuildingCount + 2 > objMainColony.mcBuildingCap )
					{
						$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
					}
					else if ( objBuildings.buildingConPlatBuildCost > objMainColony.mcStoredMaterial )
					{
						$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Construction Platform";
					}
					else
					{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Something Aweful Has Happened. Sorry, we'll try and fix that."; }
					//display warning that construction is already in progress
				}
			} );
		dom.bind( "#mainColony-screen button[name=buildMD]", "click",
			function ()
			{
				if ( !objMainColony.mcConstructionInProgress && objBuildings.buildingMDBuildCost <= objMainColony.mcStoredMaterial && objMainColony.mcCurBuildingCount + 1 < objMainColony.mcBuildingCap )
				{
					//(buildingName, buildCost, constructionTime, maintCost)
					buildingMD = true;
					objMainColony.mcConstructionInProgress = true;
					objBuildings.buildingCurBuildTime = 0;

					objMainColony.mcStoredMaterial -= objBuildings.buildingMDBuildCost;
					$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMDBuildCost;
					$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = +Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMDBuildCost;
					$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Now building: Military Depot";
					//play audio
				}
				else
				{
					if ( objMainColony.mcConstructionInProgress )
					{
						$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Already building " + currentlyBuilding;
					}
					else if ( objMainColony.mcCurBuildingCount + 1 > objMainColony.mcBuildingCap )
					{
						$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony at maximum Building Capacity.";
					}
					else if ( objBuildings.buildingMDBuildCost > objMainColony.mcStoredMaterial )
					{
						$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to build Military Depot";
					}
					else
					{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Something Aweful Has Happened. Sorry, we'll try and fix that."; }
					//display warning that construction is already in progress
				}
			} );

		///////Level Up the Main Colony
		dom.bind( "#mainColony-screen button[name=upgradeMC]", "click",
		  function ()
		  {
		  	if ( objMainColony.mcLevel < 100 )
		  	{
		  		if ( objMainColony.mcLevelUpCostMat <= objMainColony.mcStoredMaterial && objMainColony.mcStoredScience >= objMainColony.mcLevelUpCostSci )
		  		{

		  			objMainColony.mcLevel++;
		  			objMainColony.mcStoredMaterial -= objMainColony.mcLevelUpCostMat;

		  			$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = + " + " + Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
		  			$( "#mainColony-screen .mainColonyStoredMat span" )[0].innerHTML = + " + " + Math.floor( objMainColony.mcStoredMaterial ) + " - " + objBuildings.buildingMineBuildCost;
		  			$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Main Colony Upgraded. ";
		  			//play audio
		  		}
		  		else
		  		{
		  			if ( objMainColony.mcLevelUpCostMat > objMainColony.mcStoredMaterial )
		  			{
		  				$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Material to Upgrade";
		  			}
		  			else if ( objMainColony.mcStoredScience < objMainColony.mcLevelUpCostSci )
		  			{
		  				$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Not enough Science to Upgrade";
		  			}
		  			else
		  			{ $( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Need more Material and Science to Upgrade"; }

		  		}
		  	}
		  	else
		  	{
		  		$( "#mainColony-screen .screenFeedBack span" )[0].innerHTML = "Colony cannot be upgraded further.";
		  	}

		  	
		  	
		  });

		dom.bind("#mainColony-screen button[name=DestroyFarm]", "click",
             function () {
                 if (objMainColony.mcCurFarmCount > 0) {
                     objMainColony.mcCurFarmCount--;
                     objMainColony.mcCurBuildingCount--;
                     objMainColony.mcStoredMaterial += 25;
                     $("#mainColony-screen .screenFeedBack span")[0].innerHTML = "Farm destroyed.";
                 }
             });



		dom.bind("#mainColony-screen button[name=DestroyMine]", "click",
          function () {
              if (objMainColony.mcCurMineCount > 0) {
                  objMainColony.mcCurMineCount--;
                  objMainColony.mcCurBuildingCount--;
                  objMainColony.mcStoredMaterial += 50;
                  $("#mainColony-screen .screenFeedBack span")[0].innerHTML = "Mine destroyed.";
              }
          });

		dom.bind("#mainColony-screen button[name=DestroyRF]", "click",
          function () {
              if (objMainColony.mcCurRFCount > 0) {
                  objMainColony.mcCurRFCount--;
                  objMainColony.mcCurBuildingCount--;
                  objMainColony.mcStoredMaterial += 100;
                  $("#mainColony-screen .screenFeedBack span")[0].innerHTML = "Lab destroyed.";
              }
          });
		  
			
	}

	return {
		run: run,
		update: update

	};

} )();
