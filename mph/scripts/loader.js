var mph = {
	screens: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		nummphTypes: 7,
		baseLevelTimer: 60000,
		baseLevelScore: 1500,
		baseLevelExp: 1.05,
		controls: {
			KEY_UP: "moveUp",
			KEY_LEFT: "moveLeft",
			KEY_DOWN: "moveDown",
			KEY_RIGHT: "moveRight",
			KEY_ENTER: "selectMPH",
			KEY_SPACE: "selectMPH",
			CLICK: "selectMPH",
			TOUCH: "selectMPH"
		}
	},
	images: {}
};

window.addEventListener( "load", function ()
{

	// determine mph size
	var jewelProto = document.getElementById( "jewel-proto" ),
	rect = jewelProto.getBoundingClientRect();

	mph.settings.mphSize = rect.width;


	Modernizr.addTest( "standalone", function ()
	{
		return ( window.navigator.standalone != false );
	} );

	Modernizr.addTest( "webgl2", function ()
	{
		try
		{
			var canvas = document.createElement( "canvas" ),
			    ctx = canvas.getContext( "experimental-webgl" );
			return !!ctx;
		} catch ( e )
		{
			return false;
		};
	} );


	// extend yepnope with preloading
	yepnope.addPrefix( "preload", function ( resource )
	{
		resource.noexec = true;
		return resource;
	} );

	var numPreload = 0,
	    numLoaded = 0;

	yepnope.addPrefix( "loader", function ( resource )
	{
		// console.log("Loading: " + resource.url)

		var isImage = /.+\.(jpg|png|gif)$/i.test( resource.url );
		resource.noexec = isImage;

		numPreload++;
		resource.autoCallback = function ( e )
		{
			// console.log("Finished loading: " + resource.url)
			numLoaded++;
			if ( isImage )
			{
				var image = new Image();
				image.src = resource.url;
				mph.images[resource.url] = image;
			}
		};
		return resource;
	} );

	function getLoadProgress()
	{
		if ( numPreload > 0 )
		{
			return numLoaded / numPreload;
		} else
		{
			return 0;
		}
	}

	// loading stage 1
	Modernizr.load( [
	{
		test: Modernizr.localstorage,
		yep: "scripts/storage.js",
		nope: "scripts/storage.cookie.js"
	}, {
		load: [
		    "scripts/sizzle.js",
		    "scripts/dom.js",
		    "scripts/requestAnimationFrame.js",
		    "scripts/game.js"
		]
	}, {
		test: Modernizr.standalone,
		yep: "scripts/screen.splash.js",
		nope: "scripts/screen.install.js",
		complete: function ()
		{
			mph.game.setup();
			if ( Modernizr.standalone )
			{
				mph.game.showScreen( "splash-screen",
				    getLoadProgress );
			} else
			{
				mph.game.showScreen( "install-screen" );
			}
		}
	}
	] );

	// loading stage 2
	if ( Modernizr.standalone )
	{
		Modernizr.load( [
		{
			test: Modernizr.webgl2,
			yep: [
			    "loader!scripts/webgl.js",
			    "loader!scripts/webgl-debug.js",
			    "loader!scripts/glMatrix-0.9.5.min.js",
			    "loader!scripts/display.webgl.js",
			    "loader!images/jewelpattern.jpg",
			]
		}, {
			test: Modernizr.canvas && !Modernizr.webgl2,
			yep: "loader!scripts/display.canvas.js"
		}, {
			test: !Modernizr.canvas,
			yep: "loader!scripts/display.dom.js"
		}, {
			test: Modernizr.webworkers,
			yep: [
			    "loader!scripts/board.worker-interface.js",
			    "preload!scripts/board.worker.js"
			],
			nope: "loader!scripts/board.js"
		}, {
			load: [
			    "loader!scripts/audio.js",
			    "loader!scripts/input.js",
			    "loader!scripts/screen.hiscore.js",
			    "loader!scripts/screen.main-menu.js",
			    "loader!scripts/MainColony.js",
			    "loader!scripts/WorldClass.js",
			    "loader!scripts/Buildings.js",
			    "loader!scripts/screen.game.js",
			    "loader!scripts/screen.unit.js",
			    "loader!scripts/screen.worlds.js",
			    "loader!scripts/EnemyColony.js",
			    "loader!scripts/screen.mainColony.js",
			    "loader!scripts/Ships.js",
			    "loader!scripts/screen.ships.js",
			    "loader!images/jewels"
				   + mph.settings.mphSize + ".png"
			]
		}
		] );
	}



}, false );
