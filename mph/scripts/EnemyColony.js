enemyColony = ( function ()
{
    var Power = 0,
        Distance = 0
                
    setRandPower = function ()
    {
        this.Power = Math.floor((Math.random() * 1000) + 100);
    }

    setRandDistance = function()
    {
        this.Distance = Math.floor((Math.random() * 10) + 1);
    }

    return {
        Power: Power,
        Distance: Distance,
        setRandPower: setRandPower,
        setRandDistance: setRandDistance
       
    };
        
})();