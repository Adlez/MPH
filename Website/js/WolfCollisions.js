// JavaScript source code
function WolfCollision(wolves, player, collision, yugiBlasts, yugiAnnoyance, yugiDepressed, context, canvas, wolfSpawnTimer)
{
	for (var i = 0; i < wolves.length; i++)
	{
		var playerCollision = collision(player.curSpriteAnim, wolves[i].curSpriteAnim);

		if (playerCollision)
		{
			wolves[i].alive = false;
			PlayerClass.yugiAnnoyance += 1;
			metaMad = PlayerClass.yugiAnnoyance;
			metaSad = PlayerClass.yugiDepressed;
			PlayerClass.wolvesDefeated += 1;
			//display score
		

			//console.log("Annoyance Level: " + PlayerClass.yugiAnnoyance);
			//console.log("Wolves killed: " + PlayerClass.wolvesDefeated);

			//checkForEnd(metaMad, metaSad, context, canvas, player);
		}
		for (var j = 0; j < yugiBlasts.length; ++j)
		{
			var isFistCollision = collision(yugiBlasts[j].spriteAnim, wolves[i].curSpriteAnim);


			if (isFistCollision)
			{
				yugiBlasts.splice(j, 1);
				PlayerClass.wolvesDefeated += 1;
				//console.log("Wolves killed: " + PlayerClass.wolvesDefeated);
				wolves[i].alive = false;
			}

		}
		if (!wolves[i].alive)
		{
			wolves.splice(i, 1);//change this to "dead" wolf and flip the sprite upside down so it can collide with other objects
			
		}
		var WolfD = PlayerClass.wolvesDefeated;
		var wolvesDefeatedString = WolfD.toString();

	//	context.font = "20pt Calibri";
	//	context.fillStyle = "#FF00FF";
	//	context.drawString(wolvesDefeatedString, canvas.width / 2, canvas.height / 2);
	}
}