﻿objMainColony = ( function ()
{
	var	mcStoredFood = 0,
		mcStoredMaterial = 0,
		mcFoodProduction= 0,
		mcMaterialProduction = 0,
		mcScienceProduction = 0,
		mcStoredScience = 0,
		mcCurBuildingCount = 0,
		mcCurFarmCount = 0,
		mcCurMineCount = 0,
		mcCurRFCount = 0,
		mcBuildingCap = 0,
		mcLevel = 0,
		mcCurBuildingCount = 0,
		mcLevelUpCostMat = 0,
		mcLevelUpCostSci = 0,
		mcConstructionInProgress = false,
		//Main Colony Functions

		//Build function(s)
		mcBuildBuilding = function (buildingName, maintMatCost, maintFoodCost)
		{
			if ( this.mcCurBuildingCount < this.mcBuildingCap )
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
					this.mcCurBuildingCount += 2;
					objBuildings.buildingConPlatIsBuilt = true;

				}
				if ( buildingName == "Lab" )
				{
					this.mcCurRFCount++;
					this.mcCurBuildingCount++;
				}
				if ( buildingName == "MilitaryDepot" )
				{
					this.mcCurBuildingCount++;
					objBuildings.buildingMDIsBuilt = true;
				}
				if ( buildingName == "SpaceElevator" )
				{
					this.mcCurBuildingCount += 2;
					objBuildings.buildingSpaceElIsBuilt = true;
				}
				objBuildings.buildingTotalFoodMaint += maintFoodCost;
				objBuildings.buildingTotalMatMaint += maintMatCost;
			}	
			
		}
	

	function UpdateMainColony ( foodProduction, materialProduction, colonyLevel, scienceProduction )
	{
		this.mcStoredFood += foodProduction;
		this.mcStoredMaterial += materialProduction;
		this.mcStoredScience += scienceProduction;
		this.mcBuildingCap = colonyLevel * 3.2;

	}

	function EatMaintencance ( matMaint, foodMaint )
	{
		this.mcStoredFood -= foodMaint;
		this.mcStoredMaterial -= matMaint;
	}

	function updateConstruction()
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
		mcCurRFCount: mcCurRFCount,
		mcCurBuildingCount: mcCurBuildingCount,

		mcFoodProduction: mcFoodProduction,
		mcScienceProduction: mcScienceProduction,
		mcMaterialProduction: mcMaterialProduction,

		mcStoredFood: mcStoredFood,
		mcStoredMaterial: mcStoredMaterial,
		mcStoredScience: mcStoredScience,
		mcLevel: mcLevel,

		mcBuildBuilding: mcBuildBuilding,
		mcConstructionInProgress: mcConstructionInProgress,
		UpdateMainColony: UpdateMainColony,
		EatMaintencance: EatMaintencance,
		mcLevelUpCostMat: mcLevelUpCostMat,
		mcLevelUpCostSci: mcLevelUpCostSci
		

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