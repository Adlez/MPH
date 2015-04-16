objShips = ( function ()
{
    var supplyShip = 1,
        supplyShipDisplay = 0,
        supplyShipBuildCost = 100,
        supplyShipFoodUpkeep = 1,
        supplyShipPower = 15,
        supplyShipCargoSpace = 1000,

        escortFighter = 2,
        escortFighterDisplay = 0,
        escortShipBuildCost = 70,
        escortShipFoodUpkeep = 0,
        escortShipPower = 30,
        escortShipCargoSpace = 0,

        colonyShip = 3,
        colonyShipDisplay = 0,
        colonyShipBuildCost = 500,
        colonyShipFoodUpkeep = 10,
        colonyShipPower = 30,
        colonyShipCargoSpace = 200,

        exoMiner = 4,
        exoMinerDisplay = 0;
        exoBuildCost = 100,
        exoFoodUpkeep = 1,
        exoPower = 10,
        exoCargoSpace = 60,

        shipPower = 0,
        travelTime = 0,
        maxCargo = 0,
        currentCargo = 0,
        enemyShipPower = 0

        
        setRandTravelTime = function ()
        {
            this.travelTime = Math.floor((Math.random() * 20) + 10);
        }

        setRandEnemyPower = function()
        {
            this.enemyShipPower = Math.floor((Math.random() * 1000) + 500);
        }
    
    return {
        supplyShip: supplyShip,
        supplyShipDisplay: supplyShipDisplay,
        supplyShipBuildCost: supplyShipBuildCost,
        supplyShipFoodUpkeep: supplyShipFoodUpkeep,
        supplyShipPower: supplyShipPower,
        supplyShipCargoSpace: supplyShipCargoSpace,

        escortFighter: escortFighter,
        escortFighterDisplay: escortFighterDisplay,
        escortShipBuildCost: escortShipBuildCost,
        escortShipPower: escortShipPower,

        colonyShip: colonyShip,
        colonyShipPower: colonyShipPower,
        colonyShipDisplay: colonyShipDisplay,
        colonyShipBuildCost: colonyShipBuildCost,
        colonyShipFoodUpkeep: colonyShipFoodUpkeep,
        colonyShipCargoSpace: colonyShipCargoSpace,

        exoMiner: exoMiner,
        exoMinerDisplay: exoMinerDisplay,
        exoBuildCost: exoBuildCost,
        exoFoodUpkeep: exoFoodUpkeep,
        exoPower: exoPower,
        exoCargoSpace: exoCargoSpace,

        travelTime: travelTime,
        shipPower: shipPower,
        maxCargo: maxCargo,
        currentCargo: currentCargo,
        enemyShipPower: enemyShipPower,

        setRandTravelTime: setRandTravelTime,
        setRandEnemyPower: setRandEnemyPower
        
    };

})();