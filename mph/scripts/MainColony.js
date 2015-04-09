objMainColony = ( function ()
{
	var	mcStoredFood = 0,
		mcStoredMaterial = 0,
		mcFoodProduction= 0,
		mcMaterialProduction = 0,
		mcStoredScience = 0,
		mcCurBuildingCount = 0,
		mcCurFarmCount = 0,
		mcCurMineCount = 0,
		mcBuildingCap = 0,
		mcLevel = 0,
		//Main Colony Functions
		mcProduceFood = function ()
		{
			mainColony.mcStoredFood += mainColony.mcFoodProduction;
		},
		mcProduceMaterial = function ()
		{
			mainColony.mcStoredMaterial += mainColony.mcMaterialProduction;
		},

		//Build function(s)
		mcBuildBuilding = function (buildingName, buildCost, constructionTime, curBuildingCount, maintCost)
		{
			if ( curBuildingCount < mainColony.mcCurBuildingCount )
			{				
					if(i >= constructionTime)
					{
						if ( buildingName == "Farm" )
						{
							mainColony.mcCurFarmCount++;
							mainColony.mcCurBuildingCount++;
						}
						if ( buildingName == "Mine" )
						{
							mainColony.mcCurMineCount++;
							mainColony.mcCurBuildingCount++;
						}
						if ( buildingName == "ConstructionPlatform" )
						{

						}
					}				
				mainColony.mcStoredMaterial -= buildCost;
			}
			
		},

		mcBuildMine = function ()
		{
			if ( mainColony.mcCurBuildingCount >= mainColony.mcColonyBuildingCap )
			{ return; }
			else
			{
				mainColony.mcCurMineCount++;
				mainColony.mcCurBuildingCount++;
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

	return {
		objMainColony: mcBuildingCap,
		objMainColony: mcCurFarmCount,
		objMainColony: mcCurMineCount,
		objMainColony: mcFoodProduction,
		objMainColony: mcMaterialProduction,
		objMainColony: mcStoredFood,
		objMainColony: mcStoredMaterial,
		objMainColony: mcStoredScience,
		objMainColony: mcLevel,
		objMainColony: mcProduceFood,
		objMainColony: mcProduceMaterial,
		objMainColony: mcBuildBuilding

	};
});
/*
function Car()
{
	this.make = "Ford";
	this.speed = 100;
}

Object.create()
var anotherClass = Object.create;*/