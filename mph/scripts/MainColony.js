objMainColony = ( function ()
{
	var	mcStoredFood = 0,
		mcStoredMaterial = 0,
		mcFoodProduction= 0,
		mcMaterialProduction = 0,
		mcStoredScience = 0,
		mcCurBuildingCount = 0,
		mcMaxBuildingCount = 0,
		mcCurFarmCount = 0,
		mcCurMineCount = 0,
		mcBuildingCap = 0,
		mcLevel = 0,
		//Main Colony Functions
		mcProduceFood = function ()
		{
			mcStoredFood += mcFoodProduction;
		},
		mcProduceMaterial = function ()
		{
			mcStoredMaterial += mcMaterialProduction;
		},

		//Build function(s)
		mcBuildBuilding = function (buildingName, buildCost, maintCost)
		{
			if ( mcCurBuildingCount < mcMaxBuildingCount )
			{
				if ( buildingName == "Farm" )
				{
					this.mcCurFarmCount++;
					this.mcCurBuildingCount++;
				}
				if ( buildingName == "Mine" )
				{
					this.mcCurMineCount++;
					this.mcCurBuildingCount++;
				}
				if ( buildingName == "ConstructionPlatform" )
				{

				}									
				this.mcStoredMaterial -= buildCost;
			}	
			
		}
	


	//constructor function for main colony, can duplicate this for every other colony
	function MainColony( storedFood, storedMaterial ) //creates the Main Colony
	{
		this.mcStoredFood = storedFood;
		this.mcStoredMaterial = storedMaterial;
		this.mcLevel = 1;
		this.mcBuildingCap = this.mcLevel * 3.2;

	}

	function update()
	{
		if ( objBuildings.buildingConstructionTime <= objBuildings.buildingCurBuildTime )
		{
			objBuildings.buildingConstructionTime = 0;
			objMainColony.mcBuildBuilding( "Farm", 0, 0 );
		}
	}

	return {
		mcBuildingCap: mcBuildingCap,
		mcCurFarmCount: mcCurFarmCount,
		mcCurMineCount: mcCurMineCount,
		mcCurBuildingCount: mcCurBuildingCount,
		mcFoodProduction: mcFoodProduction,
		mcMaterialProduction: mcMaterialProduction,
		mcStoredFood: mcStoredFood,
		mcStoredMaterial: mcStoredMaterial,
		mcStoredScience: mcStoredScience,
		mcLevel: mcLevel,
		mcProduceFood: mcProduceFood,
		mcProduceMaterial: mcProduceMaterial,
		mcBuildBuilding: mcBuildBuilding,
		update: update

	};
})();
/*
function Car()
{
	this.make = "Ford";
	this.speed = 100;
}

Object.create()
var anotherClass = Object.create;*/