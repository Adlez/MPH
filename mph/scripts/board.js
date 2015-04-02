mph.board = ( function ()
{
	var settings,
	    baseScore,
	    foodOutput= 10,
	    materialOutput= 10;


	function elapseTime( events )
	{
		storedFood += foodOutput;
		storedMaterial += materialOutput;
	}

	function initialize( foodOutput, callback )//starting Jewels
	{
		settings = mph.settings,
		foodOutput = settings.foodOutput;

		callback();
	}

	return {
		initialize: initialize,
//		getBoard: getBoard,
		print: print
	};

} )();
