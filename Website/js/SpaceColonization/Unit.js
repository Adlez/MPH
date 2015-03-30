// JavaScript source code
var Unit;

Unit.Velos;
Unit.Aegis;
Unit.Titav;

Unit.init = function(POWER_A, POWER_T, POWER_V)
{
    this.Velos = POWER_V;
    this.Aegis = POWER_A;
    this.Titav = POWER_T;
}

function CreateUnits() {

    var Units = [];

    //if() get when button is pressed to make a unit
    Units[Units.length] = Unit.Aegis;
    //
    Units[Units.length] = Unit.Titav;
    //
    Units[Units.length] = Unit.Velos;

}

function RemoveUnits() {

    var index;

    for (index = 0; Units.length < index; index++)
    {
        if (Units[0] == POWER_V)
        {
            Units.slice(0);
        }
    }
}
    