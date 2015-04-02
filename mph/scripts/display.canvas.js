mph.display = ( function ()
{
	var dom = mph.dom,
	    $ = dom.$,
	    canvas, ctx,
	    mphSize,
	    mphs,
	    firstRun = true,
	    cursor,
	    previousCycle,
	    animations = [];

	function createBackground()
	{
		var background = document.createElement( "canvas" ),
		    bgctx = background.getContext( "2d" );

		dom.addClass( background, "background" );
		background.width = cols * mphSize;
		background.height = rows * mphSize;

		bgctx.fillStyle = "rgba(225,235,255,0.15)";
		for ( var x = 0; x < cols; x++ )
		{
			for ( var y = 0; y < cols; y++ )
			{
				if ( ( x + y ) % 2 )
				{
					bgctx.fillRect(
					    x * mphSize, y * mphSize,
					    mphSize, mphSize
					);
				}
			}
		}
		return background;
	}

	function setup()
	{

		createBackground();
	}

	function gameOver( callback )
	{
		addAnimation( 1000, {
			render: function ( pos )
			{
				canvas.style.left =
				    0.2 * pos * ( Math.random() - 0.5 ) + "em";
				canvas.style.top =
				    0.2 * pos * ( Math.random() - 0.5 ) + "em";
			},
			done: function ()
			{
				canvas.style.left = "0";
				canvas.style.top = "0";
			}
		} );
	}

	function cycle()
	{
		var time = Date.now();
		renderCursor( time );
		renderAnimations( time, previousCycle );
		previousCycle = time;
		requestAnimationFrame( cycle );
	}

	function initialize( callback )
	{
		if ( firstRun )
		{
			setup();
			firstRun = false;
		}
		callback();
	}

	return {
		initialize: initialize,
		redraw: redraw,
		setCursor: setCursor,
		movemphs: movemphs,
		removemphs: removemphs,
		refill: refill,
		levelUp: levelUp,
		gameOver: gameOver
	}
} )();
