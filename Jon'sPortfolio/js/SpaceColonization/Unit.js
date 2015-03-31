// JavaScript source code
var UnitClass = Object.create();
{
      UnitClass.Velos;
      UnitClass.Titav;
      UintClass.Aegis;

      UnitClass.Units = new Array();

    UnitClass.init = function(Velos, Titav, Aegis)
    {
        this.Velos = POWER_V;
        this.Aegis = POWER_A;
        this.Titav = POWER_T;
    };

    UnitClass.CreateUnits = function ()
    {
        //if() get when button is pressed to make a unit
        Units.push(Velos);
        //
        Units.push(Titav);
        //
        Units.push(Aegis);

    };

    UnitClass.RemoveUnits = function () 
    {

        for (var index = 0; index < this.Units.length; index++)
        {
            if (Units[0] == POWER_V)
            {
                Units.slice(0);
            }
        }
    };
};
    