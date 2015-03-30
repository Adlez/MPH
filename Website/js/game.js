$(document).ready(function()
{
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	var gameObjects = new Array();
	var wolves = new Array();
	var rocks = new Array();
	var bunnies = new Array();
	var cuteObjects = new Array();
	var Clock = 0;
	var MAX_WOLF = 1;
	var SadGameOver = false;
	var MadGameOver = false;

	var increaseMaxWolfInterval = 5000;
	var increaseMaxWolfTimer = 0;
	var wolfSpawnTimer = 0;
	var rockSpawnTimer = 0;
	var bunnySpawnTimer = 0;
//	var spawnInterval = undefined;

	var armCoolDown = 0;
	var armWindUp = 5;
	var yugiAnnoyance = 0;
	var yugiDepressed = 0;
	
	var guiLayer = undefined;					// HUDbar
	var player = Object.create(PlayerClass);	// the player object
	var bg = Object.create(BGanimClass);		// the background object
	var yugiBlasts = new Array();				// yugi's ranged attacks
	var yugiPunching = false;					// yugi Attacking boolean value

	var myAudio = new Audio("audio/WOLFPUNCHER_running.ogg");
	
	var SplashScreen = new Image();
	SplashScreen.src = "images/killer.jpg";

	var SadEndScreen = new Image();
	SadEndScreen.src = "images/SadEndScreen.png"

	var MadEndScreen = new Image();
	MadEndScreen.src = "images/MadEndScreen.png"
	
		SplashScreen.onload = function ()
		{
			context.drawImage(SplashScreen, 0, 0, 750, 500);
			context.font = "30pt Calibri";
			context.fillStyle = "#FFFFFF";
			context.fillText("Wolfpuncher", canvas.width / 2 - 300, canvas.height / 2 - 100);
			context.font = "20pt Calibri";
			context.fillStyle = "#FFFFFF";
			context.fillText("Click to start", canvas.width / 2 - 50, canvas.height / 2);
		}

		var GAME_START = false;

		function BEGINGAME()
		{
			if (GAME_START != true)
			{
				//console.log("Game has not started yet");
				canvas.addEventListener("mousedown", FirstClick, false);

				context.drawImage(SplashScreen, 0, 0, 750, 500);
				context.font = "20pt Calibri";
				context.fillStyle = "#FFFFFF";
				context.fillText("Refresh to restart.", canvas.width / 2, canvas.height / 2);

				//context.;
				function FirstClick(event)
				{
					GAME_START = true;
					canvas.removeEventListener("mousedown", FirstClick, false);
					PLAYTHEGAME();
					myAudio.addEventListener("ended", function () { this.currentTime = 0; this.play(); }, false);
				}

			}
		}

		BEGINGAME();

		function MADGAMEOVER()
		{
			myAudio.currentTime = 0;
			context.clearRect(0, 0, canvas.width, canvas.height)
			context.drawImage(MadEndScreen, 0, 0, 750, 500);
			context.font = "20pt Calibri";
			context.fillStyle = "#FFFFFF";
			context.fillText("The mayor is too angry to continue. You lose.", canvas.width / 3, canvas.height / 3);
			GAME_START = false;
			function RestartGame(event)
			{
				canvas.removeEventListener("mousedown", RestartGame, false);
				BEGINGAME();
			}
			canvas.addEventListener("mousedown", RestartGame, false);
		}

		function SADGAMEOVER()
		{
			myAudio.currentTime = 0;
			context.clearRect(0, 0, canvas.width, canvas.height)
			context.drawImage(SadEndScreen, 0, 0, 750, 500);
			context.font = "20pt Calibri";
			context.fillStyle = "#FFFFFF";
			context.fillText("The mayor is too sad to continue. You lose.", canvas.width / 3, canvas.height / 3);
			GAME_START = false;
			function RestartGame(event)
			{
				canvas.removeEventListener("mousedown", RestartGame, false);
				BEGINGAME();
			}
			canvas.addEventListener("mousedown", RestartGame, false);
		}

		function PLAYTHEGAME()
		{
			if (SadGameOver == true && MadGameOver == true)
			{
				myAudio.currentTime = 0;
			}
			else
			{
				
			}
			myAudio.play();
			var gui = new Image();
			gui.src = "images/HUDbar.png";
			var HUDbar = Object.create(SpriteAnimClass);

			

			guiLayer = HUDbar;
			guiLayer.init(gui, 0, canvas.height - 50, 0, 0, 0, 0, 768, 960, 5000);

			canvas.addEventListener("mousedown", PAWNCH, false);

			function update() // this function will be called once per game loop iteration
			{
				//console.log("Maximum Wolves on screen can be: " + MAX_WOLF);
				//console.log("increaseMaxWolfInterval is: " + increaseMaxWolfInterval);
				//console.log("increaseMaxWolfTimer is: " + increaseMaxWolfTimer);

				//console.log("Yugi's x: " + player.curSpriteAnim.x);
				//console.log("Sadness: " + player.yugiDepressed);

				if (player.yugiDepressed >= 10)
				{
					SadGameOver = true;
				}
				if (player.yugiAnnoyance >= 25)
				{
					MadGameOver = true;
				}
				GameTimer += 1;
				armWindUp += 1;
				wolfSpawnTimer += 1;
				var wolfTimeMax = 1200;
				var wolfTimeMin = 500;
				var timeTillNextWolf = Math.floor(Math.random() * (wolfTimeMax - wolfTimeMin + 1) + wolfTimeMin);
				//Make sure to reset SpawnTimer both when the object goes off screen AND when it collides

				increaseMaxWolfTimer += 1;
				

				rockSpawnTimer += 1;
				var rockTimeMax = 5000;
				var rockTimeMin = 1200;
				var timeTillNextRock = Math.floor(Math.random() * (rockTimeMax - rockTimeMin + 1) + rockTimeMin);

				bunnySpawnTimer += 1;
				var bunnyTimeMax = 2000;
				var bunnyTimeMin = 750;
				var timeTillNextBunny = Math.floor(Math.random() * (bunnyTimeMax - bunnyTimeMin + 1) + bunnyTimeMin);

				if (increaseMaxWolfTimer == increaseMaxWolfInterval)
				{
					MAX_WOLF += 1;
					increaseMaxWolfInterval += 5000;
				}

				if (wolfSpawnTimer >= timeTillNextWolf)
				{
					WolfSpawn(canvas, gameObjects, wolves, GameTimer, MAX_WOLF, wolfSpawnTimer)
				}

				if (rockSpawnTimer >= timeTillNextRock)
				{
					RockSpawn(canvas, gameObjects, rocks, GameTimer);
				}

				if (bunnySpawnTimer >= timeTillNextBunny)
				{
					BunnySpawn(canvas, gameObjects, bunnies, GameTimer);
				}

				
					//Update objects on screen
				player.update(canvas, player);
				for (var i = 0; i < gameObjects.length; ++i)
				{
					gameObjects[i].update();
				}
				for (var i = 0; i < wolves.length; ++i)
				{
					wolves[i].update();
					//console.log("Wolf is at location: " + wolves[i].curSpriteAnim.x);
					if (wolves[i].curSpriteAnim.x < -107)
					{
						wolves.splice(i);
						wolfSpawnTimer = 0;
						PlayerClass.yugiDepressed += 0.5;
						//console.log("Wolf ran off screen");
					}
				}				

				for (var i = 0; i < rocks.length; ++i)
				{
					rocks[i].update();
					if (rocks[i].curSpriteAnim.x < -107)
					{
						rocks.splice(i);
						rockSpawnTimer = 0;
						//console.log("rock is off screen");
					}
				}

				for (var i = 0; i < bunnies.length; ++i)
				{
					bunnies[i].update();
					if (bunnies[i].curSpriteAnim.x < -25)
					{
						bunnies.splice(i);
						bunnySpawnTimer = 0;
						//console.log("rock is off screen");
					}
				}

				for (var i = 0; i < yugiBlasts.length; ++i)
				{
					yugiBlasts[i].update();
					if (yugiBlasts[i].spriteAnim.x > 150)
					{
						yugiBlasts.splice(i, 1);
					}
				}
				//finished updating

				//Check for collision
				for (var i = 0; i < wolves.length; ++i)
				{
					WolfCollision(wolves, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas, wolfSpawnTimer);
					wolfSpawnTimer = 0;
				}
				for (var i = 0; i < rocks.length; ++i)
				{
					RockCollision(rocks, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas);
					rockSpawnTimer = 0;
				}
				for (var i = 0; i < bunnies.length; ++i)
				{
					BunnyCollision(bunnies, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas);
					bunnySpawnTimer = 0;
				}

				//checkForEnd(yugiAnnoyance, yugiDepressed, context, canvas, player, GameOver);

				//console.log("wolfSpawnTimer: " + wolfSpawnTimer);
				//console.log("time till next wolf spawn: " + timeTillNextWolf);
				//console.log("rockSpawnTimer: " + rockSpawnTimer);
				//console.log("time till next rock spawn: " + timeTillNextRock);
				//console.log("bunnySpawnTimer: " + bunnySpawnTimer);
				//console.log("time till next bunny spawn: " + timeTillNextBunny);
				//end collision check
			};

			function render()
			{				


				bg.render(context);
				for (var i = 0; i < gameObjects.length; ++i)
				{
					if (gameObjects[i].alive)
					{
						gameObjects[i].curSpriteAnim.render(context);
					}
				}

				for (var i = 0; i < rocks.length; ++i)
				{
					if (rocks[i].alive)
					{
						rocks[i].curSpriteAnim.render(context);
					}
				}

				for (var i = 0; i < wolves.length; ++i)
				{
					if (wolves[i].alive)
					{
						wolves[i].curSpriteAnim.render(context);
					}
				}

				for (var i = 0; i < bunnies.length; ++i)
				{
					if (bunnies[i].alive)
					{
						bunnies[i].curSpriteAnim.render(context);
					}
				}

				for (var i = 0; i < yugiBlasts.length; ++i)
				{
					yugiBlasts[i].spriteAnim.render(context);
				}

				player.curSpriteAnim.render(context);
				guiLayer.render(context);

				Clock = Math.floor(GameTimer / 64);

				context.font = "20pt Calibri";
				context.fillStyle = "#FFFFFF";
				context.fillText(player.wolvesDefeated, 183, canvas.height - 14);

				context.font = "20pt Calibri";
				context.fillStyle = "#d10e0e";
				context.fillText(Clock, canvas.width - 183, canvas.height - 14);
			};

			function gameLoop()
			{
				if (SadGameOver == true)
				{
					SADGAMEOVER();
					return;
				}
				if (MadGameOver == true)
				{
					MADGAMEOVER();
					return;
				}

				
					context.fillRect(0, 0, canvas.width, canvas.height);
					window.requestAnimationFrame(gameLoop, canvas);
					update();
					render();
				
			};

			function PlayGame()
			{
				if (SadGameOver == true || MadGameOver == true)
				{
					return;
				}
				// this function calls runPuncherLevel() and sets any variables specific to stage1
				Clock = Math.floor(GameTimer / 64);
				if (SadGameOver == false || MadGameOver == false)
				{
					runPuncherLevel(canvas, context, player, gameObjects, wolves, bg, gameLoop, Clock, MAX_WOLF);
				}
				else
				{
					return;
				}
				//runBossFight() //this will be implemented later along with States
			};

			function collision(object1, object2)
			{
				// this is the collision detection function takes 2 SpriteAnimClass objects as parameters

				if (object1.x + object1.frameWidth / 2 >= object2.x
					&& object1.x < object2.x + object2.frameWidth
					&& object1.y + object1.frameHeight >= object2.y
					&& object1.y < object2.y + object2.frameHeight)
				{
					return true;
				}
				else
				{
					return false;
				}
			};



			//Keyboard Stuff is supposed to happen here. Not all of it does. Jump was working previously, not sure what broke it.
			//var previousKey = event.keyCode(las);

				function keyDownHandler(e)
				{
					if (e.keyCode == 32) // space bar
					{
						player.jump(player);
					}

				};

				function keyUpHandler(e)
				{
					if (e.keyCode == 32) // space key
					{
						player.fall(canvas, player);
					}
				};

				function PAWNCH(event)
				{
					if (armWindUp >= 5 + PlayerClass.yugiAnnoyance)
					{
						yugiPunching = true;
						yugiPAWNCH(yugiPunching, YugiPawnchClass, player, yugiBlasts);
						armWindUp -= 5 - PlayerClass.yugiAnnoyance;
					}
				}



			window.addEventListener("keydown", keyDownHandler, false);
			window.addEventListener("keyup", keyUpHandler, false);
			PlayGame();
		}
	

});