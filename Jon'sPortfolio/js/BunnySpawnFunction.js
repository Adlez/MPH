function BunnySpawn(canvas, gameObjects, bunnies, GameTimer) 
{
	var bunniesOnScreen = bunnies.length;

	function spawnBunny() 
	{
			var enemyHit = Object.create(SpriteAnimClass); //Not currently in use but still required for the function
			var enemyDeath = Object.create(SpriteAnimClass); //Not currently in use

			var bunnyImage = new Image();
			bunnyImage.src = "images/bunny(anim).png";

			var bunnySprite = Object.create(SpriteAnimClass);
			var bunny = Object.create(EnemyClass);
			bunny.curSpriteAnim = bunnySprite;

			bunnySprite.init(bunnyImage, canvas.width, canvas.height - 75, 2, 0, 1, 0, 25, 25, 120);
			//(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate)
			bunny.init(0, 2, 2, bunnySprite, bunnySprite, enemyHit, enemyDeath, bunny.curSpriteAnim.x, bunny.curSpriteAnim.y, true);
			bunnySprite.update();
			//var bunnyVX = Math.floor(Math.random * 1000 + 1);
			//bunnySprite.x += bunnyVX;
			
			var bunniesToSpawn = 0;

			if (bunniesToSpawn < bunniesOnScreen)
			{
				return;
			}
			else
			{
				bunnies.push(bunny);
				++bunniesToSpawn;
			}
		//Don't forget to Render, check for collision, and splice when it goes off screen in the game.js
	}

	spawnBunny();

	

	 

	
}