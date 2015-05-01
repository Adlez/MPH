objWorlds = ( function ()
{
	var temp = 0;
	var h_WorldType = 0,
	h_WorldTypeName = "",
	h_WorldFertilityLevel = 0, //1:20%, 2:50%,3:20%,4:10%
	h_WorldMineralLevel = 0, //1:45%, 2:25%, 3:25%, 4:5%
	h_WorldHasRuins = false, //false:80%, true:20%
	h_DistanceFromMainColony = 0.0,
	h_DistanceFromCapital = 0.0,
	h_WorldHasColony = false,


	h_WorldColonyLevelUpCostMat = 0,
    h_WorldColonyLevel = 0,
	h_ColonyFoodOutput = 0,
	h_ColonyMaterialOutput = 0,
	h_ColonyStoredFood = 0,
	h_ColonyStoredMat = 0,
	h_ColonyStoredFoodMax = 0,
	h_ColonyStoredMatMax = 0,

	h_ColonyDefense = 0,

	h_WorldID = "",

	arrayOfWorlds = [],
	arrayOfColonies = [],
	arrayOfSyllables = [];

    worldMatCargo = 0,
    worldFoodCargo = 0,
    homeWorldMat = 0,
    homeWorldFood = 0,
    
    isSettled1 = false,
    isSettled2 = false,
    isSettled3 = false,

    updateOne = false,
    updateTwo = false,
    updateThree = false

/*	function CreateNewName()
	{
		var ID = ( Math.floor(( Math.random() * 3 ) + 1 ) );
		var IDtype;
		var IDpre;
		var IDsuff;
		if(ID == 1)
		{
			IDtype = "Px";
		}
		else if(ID == 2)
		{
			IDtype = "Mg";
		}
		else if(ID == 3)
		{
			IDtype = "As";
		}
		ID = ( Math.floor(( Math.random() * 8 ) + 1 ) );
		for(var i = 0; i < ID; ++i)
		{
			IDpre = i;
		}
		ID = ( Math.floor(( Math.random() * 20 ) + 1 ) );
		for ( var i = 0; i < ID; ++i )
		{
			if ( ID > 0 && ID < 5 )
			{
				IDsuff = "Gf";
			}
			else if ( ID > 4 && ID < 10 )
			{
				IDsuff = "Sm";
			}
			else if ( ID > 9 && ID < 21 )
			{
				IDsuff = "Au";
			}
		}
		this.h_WorldID = IDtype + IDpre +IDsuff;
	}*/

	function CreateWorld(  )
	{
		var NewWorld = Object.create( objWorlds );
	
		//decide the WorldType, 1 = Planet, 2 = Moon, 3 = Asteroid
		NewWorld.h_WorldType = Math.floor((Math.random() * 3 ) + 1);

		//Next Assign the World's Fertility And Mineral Level based on the world type
		if ( NewWorld.h_WorldType == 1 )
		{
			NewWorld.h_WorldFertilityLevel = ( Math.floor(( Math.random() * 3 ) + 1 ) );
			//Planets Get +1 Fertility Level:
			NewWorld.h_WorldFertilityLevel++;
			//Foodoutput determined by Ferility and Level
			NewWorld.h_ColonyFoodOutput = h_WorldFertilityLevel * NewWorld.h_WorldColonyLevel;
			NewWorld.h_WorldTypeName = "Planet";


			NewWorld.h_WorldMineralLevel = Math.floor(( Math.random() * 3 ) + 1 );
			NewWorld.h_ColonyMaterialOutput = h_WorldMineralLevel * NewWorld.h_WorldColonyLevel;
			//Planets can have ruins:
			temp = ( ( Math.random() * 100 ) + 1 );
			if ( temp >= 50 )
			{
				NewWorld.h_WorldHasRuins = true;
			}

		}
		else if ( NewWorld.h_WorldType == 2 )
		{
			NewWorld.h_WorldFertilityLevel = Math.floor(( Math.random() * 3 ) + 1 );
			//Moons are not as fertile as Planets so their output is halved
			NewWorld.h_ColonyFoodOutput = Math.floor(( NewWorld.h_WorldFertilityLevel * NewWorld.h_WorldColonyLevel ) * 0.5 );
			NewWorld.h_WorldTypeName = "Moon";

			NewWorld.h_WorldMineralLevel = Math.floor(( Math.random() * 3 ) + 1 );
			NewWorld.h_ColonyMaterialOutput = h_WorldMineralLevel * NewWorld.h_WorldColonyLevel;

		}
		else if ( NewWorld.h_WorldType == 3 )
		{
			//Asteroids cannot be fertile
			NewWorld.h_WorldFertilityLevel = 0;
			NewWorld.h_ColonyFoodOutput = NewWorld.h_WorldFertilityLevel * NewWorld.h_WorldColonyLevel;
			NewWorld.h_WorldTypeName = "Asteroid";

			NewWorldh_WorldMineralLevel = Math.floor(( Math.random() * 3 ) + 1 );
			NewWorld.h_ColonyMaterialOutput = h_WorldMineralLevel * NewWorld.h_WorldColonyLevel;
			//Asteroids produce Material Much faster
			NewWorld.h_ColonyMaterialOutput *= 2;
		}
		else
		{
			console.log( "Error, no World Type" )
		}

		//Determine if World has Ruins or not
		var RuinOdds = Math.floor(( Math.random() * 10 ) + 1 );	
		if ( RuinOdds >= 2 )
		{
			NewWorld.h_WorldHasRuins = true;
		}

		//determine world's Travel Time/Distance from the Main Colony
		NewWorld.h_DistanceFromMainColony = Math.floor(( Math.random() * 42 ) + 12 );
//		NewWorld.CreateNewName();

		//CREATE NAME:::::::::::::
		var ID = ( Math.floor(( Math.random() * 3 ) + 1 ) );
		var IDtype;
		var IDpre;
		var IDsuff;
		if ( ID == 1 )
		{
			IDtype = "Px";
		}
		else if ( ID == 2 )
		{
			IDtype = "Mg";
		}
		else if ( ID == 3 )
		{
			IDtype = "As";
		}
		ID = ( Math.floor(( Math.random() * 8 ) + 1 ) );
		for ( var i = 0; i < ID; ++i )
		{
			IDpre = i;
		}
		ID = ( Math.floor(( Math.random() * 20 ) + 1 ) );
		for ( var i = 0; i < ID; ++i )
		{
			if ( ID > 0 && ID < 5 )
			{
				IDsuff = "Gf";
			}
			else if ( ID > 4 && ID < 10 )
			{
				IDsuff = "Sm";
			}
			else if ( ID > 9 && ID < 21 )
			{
				IDsuff = "Au";
			}
		}
		NewWorld.h_WorldID = IDtype + IDpre + IDsuff;

		NewWorld.h_WorldHasColony = false;

		arrayOfWorlds.push( NewWorld );

	}

	//Colonize World
	function ColonizeWorld(indexNumber)
	{
		var index = indexNumber;

		if ( !this.arrayOfWorlds[index].h_WorldHasColony )
		{

			this.arrayOfWorlds[index].h_WorldHasColony = true;
			this.arrayOfWorlds[index].h_WorldColonyLevel = 1;
		}
		else
		{
			return;
		}
	}


	function UpdateOffWorldColony( )
	{
		for ( index = 0; index < arrayOfWorlds.length; index++ )
		{

			this.arrayOfWorlds[index].h_ColonyStoredFood += this.arrayOfWorlds[index].h_ColonyFoodOutput;
			this.arrayOfWorlds[index].h_ColonyStoredMat += this.arrayOfWorlds[index].h_ColonyMaterialOutput;

			if ( this.arrayOfWorlds[index].h_ColonyStoredFood >= this.arrayOfWorlds[index].h_ColonyStoredFoodMax )
			{
				this.arrayOfWorlds[index].h_ColonyStoredFood = this.arrayOfWorlds[index].h_ColonyStoredFood;
			}
			if ( this.arrayOfWorlds[index].h_ColonyStoredMat >= this.arrayOfWorlds[index].h_ColonyStoredMatMax )
			{
				this.arrayOfWorlds[index].h_ColonyStoredMat = this.arrayOfWorlds[index].h_ColonyStoredMat;
			}
		}
	}

	function UpdateWorlds()
	{
		for ( var i = 0; i < arrayOfWorlds.length; ++i )
		{
			if ( this.arrayOfWorlds[i].h_WorldHasColony )
			{
				this.arrayOfWorlds[i].UpdateOffWorldColony(i);
			}
		}

	}

	function UpdateWorldsDisplays()
	{
	}

	function SendResourcesToMainColony()
	{

	}


	//	MainColonyWorld : WorldClass;
	return {
		h_WorldType: h_WorldType,
		h_WorldHasRuins: h_WorldHasRuins,
		h_WorldFertilityLevel: h_WorldFertilityLevel,
		h_WorldMineralLevel: h_WorldMineralLevel,
		h_ColonyStoredFood: h_ColonyStoredFood,
		h_ColonyStoredMat: h_ColonyStoredMat,


		h_DistanceFromMainColony: h_DistanceFromMainColony,
		h_DistanceFromCapital: h_DistanceFromCapital,

		h_WorldHasColony: h_WorldHasColony,
		h_WorldColonyLevel: h_WorldColonyLevel,
		
		h_WorldID: h_WorldID,

		arrayOfWorlds: arrayOfWorlds,

		CreateWorld: CreateWorld,
//		CreateNewName: CreateNewName,

		ColonizeWorld: ColonizeWorld,

		UpdateOffWorldColony: UpdateOffWorldColony,
		UpdateWorldsDisplays: UpdateWorldsDisplays,
		UpdateWorlds: UpdateWorlds,
		
		arrayOfWorlds: arrayOfWorlds,
		worldMatCargo: worldMatCargo,
		worldFoodCargo: worldFoodCargo,
		h_ColonyFoodOutput: h_ColonyFoodOutput,
		h_ColonyMaterialOutput: h_ColonyMaterialOutput,
		isSettled1: isSettled1,
		isSettled2: isSettled2,
		isSettled3: isSettled3,
		updateOne: updateOne,
		updateTwo: updateTwo, 
		updateThree: updateThree,
		homeWorldMat: homeWorldMat,
		homeWorldFood: homeWorldFood


	};
} )();