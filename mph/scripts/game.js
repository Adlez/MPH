mph.game = ( function ()
{
	var dom = mph.dom,
	    $ = dom.$;

	// hide the active screen (if any) and show the screen
	// with the specified id
	function showScreen( screenId )
	{
		var activeScreen = $( "#game .screen.active" )[0],
		    screen = $( "#" + screenId )[0];
		if ( activeScreen )
		{
			dom.removeClass( activeScreen, "active" );
		}

		// extract screen parameters from arguments
		var args = Array.prototype.slice.call( arguments, 1 );
		// run the screen module
		mph.screens[screenId].run.apply(
		    mph.screens[screenId], args
		);

		// display the screen html
		dom.addClass( screen, "active" );
	}

	// create background pattern
	function createBackground()
	{
		if ( !Modernizr.canvas ) return;

		var canvas = document.createElement( "canvas" ),
		    ctx = canvas.getContext( "2d" ),
		    background = $( "#game .background" )[0],
		    rect = background.getBoundingClientRect(),
		    gradient,
		    i;
		/* Original Code */
		   canvas.width = rect.width;
		   canvas.height = rect.height; 
		/*Test Code*//*
		canvas.width = rect.height;
		canvas.height = rect.width;*/

		//scale for wide and tall
		ctx.scale( rect.height, rect.width );

		gradient = ctx.createRadialGradient(
		    0.25, 0.15, 0.5,
		    0.25, 0.15, 1
		);
		gradient.addColorStop( 0, "rgb(55,65,50)" );
		gradient.addColorStop( 1, "rgb(0,0,0)" );
		ctx.fillStyle = gradient;
		ctx.fillRect( 0, 0, 1, 1 );

		ctx.strokeStyle = "rgba(255,255,255,0.02)";
		ctx.strokeStyle = "rgba(0,0,0,0.2)";
		ctx.lineWidth = 0.008;
		ctx.beginPath();
		for ( i = 0; i < 2; i += 0.020 )
		{
			ctx.moveTo( i, 0 );
			ctx.lineTo( i - 1, 1 );
		}
		ctx.stroke();
		background.appendChild( canvas );
	}


	function setup()
	{
		// disable native touchmove behavior to 
		// prevent overscroll
		dom.bind( document, "touchmove", function ( event )
		{
			event.preventDefault();
		} );
		// hide the address bar on Android devices
		if ( /Android/.test( navigator.userAgent ) )
		{
			$( "html" )[0].style.width = "200%";
			setTimeout( function ()
			{
				window.scrollTo( 0, 1 );
			}, 0 );
		}

		createBackground();
	}

	// expose public methods
	return {
		setup: setup,
		showScreen: showScreen
	};
} )();

//Swapping height and width to have the game play in a landscape mode