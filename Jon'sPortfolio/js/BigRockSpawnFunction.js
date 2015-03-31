function RockSpawn(canvas, gameObjects, rocks, GameTimer) 
{
	var rocksOnScreen = rocks.length;

	function spawnRock() 
	{
			var enemyHit = Object.create(SpriteAnimClass); //Not currently in use but still required for the function
			var enemyDeath = Object.create(SpriteAnimClass); //Not currently in use

			var rockImage = new Image();
			rockImage.src = "images/largeRock.png";

			var rockSprite = Object.create(SpriteAnimClass);
			var rock = Object.create(EnemyClass);
			rock.curSpriteAnim = rockSprite;

			rockSprite.init(rockImage, canvas.width, canvas.height - 225, 1, 0, 0, 0, 185, 250, 120);
			//(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate)
			rock.init(0, 2, 2, rockSprite, rockSprite, enemyHit, enemyDeath, rock.curSpriteAnim.x + Math.floor(Math.random * 10 + 1), rock.curSpriteAnim.y, true);

			
			var rocksToSpawn = 0;

			if (rocksToSpawn < rocksOnScreen)
			{
				return;
			}
			else
			{
				rocks.push(rock);
				++rocksToSpawn;
			}
	}

	spawnRock();
	
		//var spawnInterval = setInterval(function () { spawnRock() }, 1000 * Math.floor(Math.random() * 10 + 1));

	

	 

	
}