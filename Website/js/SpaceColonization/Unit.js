// JavaScript source code
var UnitClass = Object.create(GameObjectClass);
{
    UnitClass.Velos;
    UnitClass.Titav;
    UintClass.Aegis;

    UnitClass.init = function(POWER_A, POWER_T, POWER_V)
    {
        this.Velos = POWER_V;
        this.Aegis = POWER_A;
        this.Titav = POWER_T;
    };

    function CreateUnits() {

        var Units = new Array();

        //if() get when button is pressed to make a unit
        Units.push(Velos);
        //
        Units.push(Titav);
        //
        Units[Units.length] = Unit.Velos;

    }

    function RemoveUnits() {

        for (var index = 0; index < this.Units.length; index++)
        {
            if (Units[0] == POWER_V)
            {
                Units.slice(0);
            }
        }
    }
}
    