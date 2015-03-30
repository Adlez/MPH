mph.screens["splash-screen"] = ( function ()
{
	var firstRun = true;

	function setup()
	{
		mph.dom.bind( "#splash-screen", "click", function ()
		{
			mph.showScreen( "main-menu" );
		} );
	}

	function run()
	{
		if ( firstRun )
		{
			setup();
			firstRun = false;
		}
	}

	return {
		run: run
	};
} )();
