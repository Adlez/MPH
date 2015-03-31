// JavaScript source code
function BunnyCollision(bunnies, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas)
{
	for (var i = 0; i < bunnies.length; i++) 
	{
		var playerCollision = collision(player.curSpriteAnim, bunnies[i].curSpriteAnim);
		bunnyCrush = new Audio();
		bunnyCrush.src = "audio/hand_pushes_through_guts_in_body_and_breaks_ribs.ogg";

		if (playerCollision)
		{
			
			bunnies[i].alive = false;
			PlayerClass.yugiDepressed += 1;
			metaMad = PlayerClass.yugiAnnoyance;
			metaSad = PlayerClass.yugiDepressed;
			bunnyCrush.play();
			//display score


			//console.log("Sadness Level: " + PlayerClass.yugiDepressed);

			//checkForEnd(metaMad, metaSad, context, canvas, player, GameOver);

		}
		for (var j = 0; j < yugiBlasts.length; ++j)
		{
			var isFistCollision = collision(yugiBlasts[j].spriteAnim, bunnies[i].curSpriteAnim);


			if (isFistCollision)
			{
				yugiBlasts.splice(j, 1);
				bunnies[i].alive = false;
				PlayerClass.yugiDepressed += 1;
			}

		}
		/*for (var j = 0; j < bunnies.length; ++j)
		{
			var enemyCollision = collision(bunnies[i].curSpriteAnim, bunnies[j].curSpriteAnim);
			if (enemyCollision)
			{
				bunnies[i].vY *= -1;
				bunnies[j].vY *= -1;
				bunnies[i].vX *= -1;
				bunnies[j].vX *= -1;
			}
		}*/
		if (!bunnies[i].alive)
		{
			bunnies.splice(i, 1);
		}
	}
}