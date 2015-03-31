$( document ).ready( function ()
{
	var canvas = document.getElementById( 'myCanvas' );
	var context = canvas.getContext( '2d' );

	var h_GameObjects = new List();
	var h_Colonies = new List();
	var h_Worlds = new List();

	var h_GameOver = false;

	var Clock = 0;

	var guiLayer = undefined;					// HUDbar
	var player = Object.create( PlayerClass );	// the player object
	var bg = Object.create( BGanimClass );		// the background object

	var myAudio = new Audio( "audio/WOLFPUNCHER_running.ogg" );

	var SplashScreen = new Image();
	SplashScreen.src = "images/killer.jpg";

	var MadEndScreen = new Image();
	MadEndScreen.src = "images/MadEndScreen.png"

	SplashScreen.onload = function ()
	{
		context.drawImage( SplashScreen, 0, 0, 750, 500 );
		context.font = "30pt Calibri";
		context.fillStyle = "#FFFFFF";
		context.fillText( "Wolfpuncher", canvas.width / 2 - 300, canvas.height / 2 - 100 );
		context.font = "20pt Calibri";
		context.fillStyle = "#FFFFFF";
		context.fillText( "Click to start", canvas.width / 2 - 50, canvas.height / 2 );
	}

	var GAME_START = false;

	function BEGINGAME()
	{
		if ( GAME_START != true )
		{
			//console.log("Game has not started yet");
			canvas.addEventListener( "mousedown", FirstClick, false );

			context.drawImage( SplashScreen, 0, 0, 750, 500 );
			context.font = "20pt Calibri";
			context.fillStyle = "#FFFFFF";
			context.fillText( "Refresh to restart.", canvas.width / 2, canvas.height / 2 );

			//context.;
			function FirstClick( event )
			{
				GAME_START = true;
				canvas.removeEventListener( "mousedown", FirstClick, false );
				PLAYTHEGAME();
				myAudio.addEventListener( "ended", function () { this.currentTime = 0; this.play(); }, false );
			}

		}
	}

	BEGINGAME();

	function GameOver()
	{
		myAudio.currentTime = 0;
		context.clearRect( 0, 0, canvas.width, canvas.height )
		context.drawImage( MadEndScreen, 0, 0, 750, 500 );
		context.font = "20pt Calibri";
		context.fillStyle = "#FFFFFF";
		context.fillText( "The mayor is too angry to continue. You lose.", canvas.width / 3, canvas.height / 3 );
		GAME_START = false;
		function RestartGame( event )
		{
			canvas.removeEventListener( "mousedown", RestartGame, false );
			BEGINGAME();
		}
		canvas.addEventListener( "mousedown", RestartGame, false );
	}

	function PLAYTHEGAME()
	{
		if (h_GameOver == true )
		{
			myAudio.currentTime = 0;
		}
		else
		{
		}
		myAudio.play();
		var gui = new Image();
		gui.src = "images/HUDbar.png";
		var HUDbar = Object.create( SpriteAnimClass );



		guiLayer = HUDbar;
		guiLayer.init( gui, 0, canvas.height - 50, 0, 0, 0, 0, 768, 960, 5000 );

		canvas.addEventListener( "mousedown", PAWNCH, false );

		function update() // this function will be called once per game loop iteration
		{
			//console.log("Yugi's x: " + player.curSpriteAnim.x);
			GameTimer += 1;

			var timeTillNextWolf = Math.floor( Math.random() * ( wolfTimeMax - wolfTimeMin + 1 ) + wolfTimeMin );

			//Update objects on screen
			player.update( canvas, player );
			for ( var i = 0; i < gameObjects.length; ++i )
			{
				gameObjects[i].update();
			}

			
			/*for ( var i = 0; i < wolves.length; ++i )
			{
				wolves[i].update();
				//console.log("Wolf is at location: " + wolves[i].curSpriteAnim.x);
				if ( wolves[i].curSpriteAnim.x < -107 )
				{
					wolves.splice( i );
					wolfSpawnTimer = 0;
					PlayerClass.yugiDepressed += 0.5;
					//console.log("Wolf ran off screen");
				}
			}*/
			//finished updating


			//Check for collision
			for ( var i = 0; i < wolves.length; ++i ) //h_Fighters.length;
			{
				WolfCollision( wolves, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas, wolfSpawnTimer ); //FighterCollision
			}

			//console.log("blablabla: " + variable);
			//end collision check
		};

		function render()
		{
			bg.render( context );
			//draw all gameobjects
			for ( var i = 0; i < gameObjects.length; ++i )
			{
				if ( gameObjects[i].alive )
				{
					gameObjects[i].curSpriteAnim.render( context );
				}
			}

			player.curSpriteAnim.render( context );
			guiLayer.render( context );

			//Create a GameTimer that will be displayed on screen
			Clock = Math.floor( GameTimer / 64 );

			//Draw variables to the GameScreen
			context.font = "20pt Calibri";
			context.fillStyle = "#FFFFFF";
			context.fillText( player.wolvesDefeated, 183, canvas.height - 14 );

			context.font = "20pt Calibri";
			context.fillStyle = "#d10e0e";
			context.fillText( Clock, canvas.width - 183, canvas.height - 14 );
		};

		function GameLoop()
		{
			if ( h_GameOver == true )
			{
				GameOver();
				return;
			}

			context.fillRect( 0, 0, canvas.width, canvas.height );
			window.requestAnimationFrame( GameLoop(), canvas );
			update();
			render();
		};

		function PlayGame()
		{
			//Check if the game is over

			// this function calls runPuncherLevel() and sets any variables specific to stage1
			//Set GameTimer/Clock
			//If the Game is not Over
			//Run the Level
			//Else if the game is over, return
		};

		function collision( object1, object2 )
		{
			// this is the collision detection function takes 2 SpriteAnimClass objects as parameters
			if ( object1.x + object1.frameWidth / 2 >= object2.x
			    && object1.x < object2.x + object2.frameWidth
			    && object1.y + object1.frameHeight >= object2.y
			    && object1.y < object2.y + object2.frameHeight )
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		//var previousKey = event.keyCode(las);

		function keyDownHandler( e )
		{
			if ( e.keyCode == 32 ) // space bar
			{

			}

		};

		function keyUpHandler( e )
		{
			if ( e.keyCode == 32 ) // space key
			{

			}
		};
		window.addEventListener( "keydown", keyDownHandler, false );
		window.addEventListener( "keyup", keyUpHandler, false );
		PlayGame();
	}


} );