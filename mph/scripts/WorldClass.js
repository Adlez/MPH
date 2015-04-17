objWorlds = ( function ()
{
	var temp = 0;
	var h_WorldType= 0,
	h_WorldTypeName= "",
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

	h_ColonyDefense = 0,

	h_WorldID = "",

	arrayOfWorlds = [],
	arrayOfColonies = [],
	arrayOfSyllables=[],

    displayWorldName = "",
    worldMatCargo = 0,
    worldFoodCargo = 0

	NameWorld();
	function NameWorld()
	{
		arrayOfSyllables.push( "ka" );
		arrayOfSyllables.push( "zu" );
		arrayOfSyllables.push( "zei" );
		arrayOfSyllables.push( "ash" );
		arrayOfSyllables.push( "ri" );
		arrayOfSyllables.push( "BX" );
		arrayOfSyllables.push( "mo" );
		arrayOfSyllables.push( "ja" );
		arrayOfSyllables.push( "el" );
		arrayOfSyllables.push( "ich" );
		arrayOfSyllables.push( "en" );
	}

	function CreateNewName()
	{
		//Creates a first name with 2-3 syllables
		var h_WorldID = String = "";
		var numberOfSyllablesInFirstName = int = ((Math.random() * 4) + 2);
		for (var i= int = 0; i < numberOfSyllablesInFirstName; i++)
		{
			h_WorldID += arrayOfSyllables[Math.random() * arrayOfSyllables.length];
		}
		var h_WorldIDLetter = String = "";
	}

	function CreateWorld(  )
	{


		//decide the WorldType, 1 = Planet, 2 = Moon, 3 = Asteroid
		this.h_WorldType = Math.floor(( Math.random() * 3 ) + 1 );		

		//Next Assign the World's Fertility And Mineral Level based on the world type
		if(this.h_WorldType == 1)
		{
			this.h_WorldFertilityLevel = ( Math.floor(( Math.random() * 3 ) + 1 ) );
			//Planets Get +1 Fertility Level:
			this.h_WorldFertilityLevel++;
			//Foodoutput determined by Ferility and Level
			this.h_ColonyFoodOutput = h_WorldFertilityLevel * h_WorldColonyLevel;
			this.h_WorldTypeName = "Planet";


			this.h_WorldMineralLevel = ( Math.floor(( Math.random() * 3 ) + 1 ) );
			this.h_ColonyMaterialOutput = h_WorldMineralLevel * h_WorldColonyLevel;
			//Planets can have ruins:
			temp = ( ( Math.random() * 100 ) + 1 );
			if ( temp >= 50 )
			{
				this.h_WorldHasRuins = true;
			}

		}
		else if ( this.h_WorldType == 2 )
		{
			this.h_WorldFertilityLevel = Math.floor(( Math.random() * 3 ) + 1 );
			//Moons are not as fertile as Planets so their output is halved
			this.h_ColonyFoodOutput = Math.floor(( this.h_WorldFertilityLevel * this.h_WorldColonyLevel ) * 0.5 );
			this.h_WorldTypeName = "Moon";

			this.h_WorldMineralLevel = ( Math.floor(( Math.random() * 3 ) + 1 ) );
			this.h_ColonyMaterialOutput = h_WorldMineralLevel * h_WorldColonyLevel;

		}
		else if (this.h_WorldType == 3)
		{
			//Asteroids cannot be fertile
			this.h_WorldFertilityLevel = 0;
			this.h_ColonyFoodOutput = this.h_WorldFertilityLevel * h_WorldColonyLevel;
			this.h_WorldTypeName = "Asteroid";

			this.h_WorldMineralLevel = ( Math.floor(( Math.random() * 3 ) + 1 ) );
			this.h_ColonyMaterialOutput = h_WorldMineralLevel * h_WorldColonyLevel;
			//Asteroids produce Material Much faster
			this.h_ColonyMaterialOutput *= 2;
		}
		else
		{ console.log( "Error, no World Type" ) }

		//this.h_WorldID = "";

		//arrayOfWorlds.push();

		//for (index = 0; index < arrayOfWorlds.length; index++) {
		    
		    //h_WorldID = CreateNewName();
		    arrayOfWorlds.push(h_WorldID);
		//}
		
		

	}

	function nameWorld()
	{

	}



	//	MainColonyWorld : WorldClass;
	return {
		h_WorldType: h_WorldType,
		h_WorldHasRuins: h_WorldHasRuins,
		h_WorldFertilityLevel: h_WorldFertilityLevel,
		h_WorldMineralLevel: h_WorldMineralLevel,
		h_DistanceFromMainColony: h_DistanceFromMainColony,
		h_DistanceFromCapital: h_DistanceFromCapital,
		h_WorldHasColony: h_WorldHasColony,
		h_WorldColonyLevel: h_WorldColonyLevel,
		h_WorldID: h_WorldID,

		CreateWorld: CreateWorld,
		displayWorldName: displayWorldName,
		arrayOfWorlds: arrayOfWorlds,
		worldMatCargo: worldMatCargo,
		worldFoodCargo: worldFoodCargo,
		h_ColonyFoodOutput: h_ColonyFoodOutput,
		h_ColonyMaterialOutput: h_ColonyMaterialOutput

	};
} )();