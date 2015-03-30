function WolfSpawn(canvas, gameObjects, wolves, GameTimer, MAX_WOLF, wolfSpawnTimer)
{
	//wolfSpawnTimer = 0;
	
	//var spawnTimerModifier = GameTimer + wolfSpawnTimer;
	



	function spawnWolf()
	{
		
		//window.clearTimeout(wolfSpawnTimer);

		if (wolves.length >= MAX_WOLF)
		{
			//window.clearTimeout(spawnInterval);
			//console.log("too many wolves on screen");
			return;
		}
		else
		{
			var enemyHit = Object.create(SpriteAnimClass); //Not currently in use but still required for the function
			var enemyDeath = Object.create(SpriteAnimClass); //Not currently in use

			var wolfImage = new Image();
			wolfImage.src = "images/wolf(anim).png";

			var wolfSprite = Object.create(SpriteAnimClass);
			var wolf = Object.create(EnemyClass);
			wolf.curSpriteAnim = wolfSprite;

			wolfSprite.init(wolfImage, canvas.width, canvas.height - 157, 2, 0, 1, 0, 214, 107, 120);
			wolfSprite.update();
			//(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate)

			wolf.init(0, 2, 2, wolfSprite, wolfSprite, enemyHit, enemyDeath, wolf.curSpriteAnim.x, wolf.curSpriteAnim.y, true);

			wolves.push(wolf);

			var MaxSpeed = 2500;
			var MinSpeed = 1000;

			wolfVX = Math.floor(Math.random() * (MaxSpeed - MinSpeed + 1) + MinSpeed);
			wolfSprite.x += wolfVX;

			
			
			
			
			
			//Don't forget to Render, check for collision, and splice when it goes off screen in the game.js



			
		}
		
		
	}
	for (i = 0; i < MAX_WOLF; ++i)
	{
		spawnWolf();
	}


	
	

	
}