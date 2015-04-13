mph.enemyColony = ( function ()
{
    var Power = 10,
        finalPower = 0,
        victory = false,
        loser = false,
        unit = mph.screens["unit-screen"]

    decideBattle = function ()
    {
        finalPower - unit.unitState.displayPower;
        if(finalPower <= 0)
        {
            victory = true;
        }

        if(finalPower > 0)
        {
            loser = true;
        }
    }

    return {
        enemyColony: Power,
        enemyColony: victory,
        enemyColony: loser
    };
        
});