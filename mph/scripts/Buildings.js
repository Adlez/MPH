objBuildings = ( function ()
{
	var buildingName = "",
		buildingSize = 0,
		buildingProductionTypeAAmount = 0,
		buildingProductionTypeBAmount = 0,
		buildingProductionTypeA = "",
		buildingProductionTypeB = "",
		buildingMaintFood = 0,
		buildingMaintMat = 0,
		buildingDeconstructSpeed = 0,
		buildingConstructionTime = 0,
		buildingCurBuildTime = 0,
		buildingTotalMatMaint = 0,
		buildingTotalFoodMaint = 0,

		//Build Times
		buildingFarmBuildTime = 15,
		buildingMineBuildTime = 15,
		buildingRFBuildTime = 30,
		buildingMDBuildTime = 20,
		buildingConPlatBuildTime = 25,
		buildingSpaceElBuildTime = 60,

		//Material Costs
		buildingFarmBuildCost = 50,
		buildingMineBuildCost = 100,
		buildingRFBuildCost = 250,
		buildingMDBuildCost = 150,
		buildingConPlatBuildCost = 200,
		buildingSpaceElBuildCost = 210,

		//Building Functions
		buildingProduceResources = function ( resourceA, resourceB, resourceAamt, resourceBamt )
		{

		}


	return {
		buildingName: buildingName,
		buildingProductionTypeA: buildingProductionTypeA,
		buildingProductionTypeB: buildingProductionTypeB,
		buildingProductionTypeAAmount: buildingProductionTypeAAmount,
		buildingProductionTypeBAmount: buildingProductionTypeBAmount,
		buildingSize: buildingSize,
		buildingTotalMatMaint: buildingTotalMatMaint,
		buildingTotalFoodMaint: buildingTotalFoodMaint,

		buildingFarmBuildCost : buildingFarmBuildCost,
		buildingMineBuildCost: buildingMineBuildCost,
		buildingRFBuildCost : buildingRFBuildCost,
		buildingMDBuildCost : buildingMDBuildCost,
		buildingConPlatBuildCost : buildingConPlatBuildCost,
		buildingSpaceElBuildCost: buildingSpaceElBuildCost,

		buildingFarmBuildTime: buildingFarmBuildTime,
		buildingMineBuildTime: buildingMineBuildTime,
		buildingRFBuildTime: buildingRFBuildTime,
		buildingMDBuildTime: buildingMDBuildTime,
		buildingConPlatBuildTime: buildingConPlatBuildTime,
		buildingSpaceElBuildTime: buildingSpaceElBuildTime,

		buildingCurBuildTime: buildingCurBuildTime


	};
} ());