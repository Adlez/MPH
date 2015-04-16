enemyColony = ( function ()
{
    var Power = 0,
        ParaPower = 0,
        Distance = 0,
        attackDelay = 0,
        randAttackerPower = 0,
        difficultyIncrease = 0,
        enemyReset = 10,
        lowerShipPower1 = false,
        lowerShipPower2 = false
                
    setRandPower = function ()
    {
        this.Power = Math.floor((Math.random() * 100) + 50);
    }

    setRandParaPower = function () {
        this.ParaPower = Math.floor((Math.random() * 100) + 50);
    }

    setRandAttackerPower = function () {
        this.randAttackerPower = Math.floor((Math.random() * 1000) + 100);
    }

    setRandDistance = function()
    {
        this.Distance = Math.floor((Math.random() * 10) + 1);
    }

    setRandAttackDelay = function()
    {
        this.attackDelay = Math.floor((Math.random() * 600) + 300);
    }

    setDifficultyChangeLvl1 = function()
    {
        this.Power = Math.floor((Math.random() * 1500) + 500);
        this.ParaPower = Math.floor((Math.random() * 1700) + 300);
    }

    setDifficultyChangeLvl2 = function () {
        this.Power = Math.floor((Math.random() * 1800) + 750);
        this.ParaPower = Math.floor((Math.random() * 2000) + 500);
    }

    return {
        Power: Power,
        ParaPower: ParaPower,
        Distance: Distance,
        attackDelay: attackDelay,
        enemyReset: enemyReset,
        randAttackerPower: randAttackerPower,
        setRandPower: setRandPower,
        setRandParaPower: setRandParaPower,
        setRandDistance: setRandDistance,
        setRandAttackDelay: setRandAttackDelay,
        setRandAttackerPower: setRandAttackerPower,
        difficultyIncrease: difficultyIncrease,
        setDifficultyChangeLvl1: setDifficultyChangeLvl1,
        setDifficultyChangeLvl2: setDifficultyChangeLvl2
       
    };
        
})();