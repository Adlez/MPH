// JavaScript source code
function RockCollision(rocks, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas)
{
	for (var i = 0; i < rocks.length; i++) 
	{
		var playerCollision = collision(player.curSpriteAnim, rocks[i].curSpriteAnim);

		if (playerCollision)
		{
			rocks[i].alive = false;
			PlayerClass.yugiAnnoyance += 1;
			metaMad = PlayerClass.yugiAnnoyance;
			metaSad = PlayerClass.yugiDepressed;
			//display score


			//console.log("Annoyance Level: " + PlayerClass.yugiAnnoyance);
			//console.log("Wolves killed: " + PlayerClass.rocksDefeated);

			//checkForEnd(metaMad, metaSad, context, canvas, player, GameOver);
			/* //This will be implemented later, but basically if Yu-gi gets to annoyed, or bored, it's game over.
			//Checking here every time she gets hit to see if the player loses
			if(yugiAnnoyance >= 15)
			{
				gameState = GAME_OVER;
			}
			*/
		}
		for (var j = 0; j < yugiBlasts.length; ++j) {
			var isFistCollision = collision(yugiBlasts[j].spriteAnim, rocks[i].curSpriteAnim);


			if (isFistCollision)
			{
				yugiBlasts.splice(j, 1);
				rocks[i].alive = false;
				PlayerClass.yugiAnnoyance += 0.3;
			}

		}
		/*for (var j = 0; j < rocks.length; ++j)
		{
			var enemyCollision = collision(rocks[i].curSpriteAnim, rocks[j].curSpriteAnim);
			if (enemyCollision)
			{
				rocks[i].vY *= -1;
				rocks[j].vY *= -1;
				rocks[i].vX *= -1;
				rocks[j].vX *= -1;
			}
		}*/
		if (!rocks[i].alive)
		{
			rocks.splice(i, 1);//change this to "dead" rock and flip the sprite upside down so it can collide with other objects
		}
	}
}